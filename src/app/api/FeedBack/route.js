import db from "@/lib/config/db";
import { diagnosisHistory, finalResultsTable, layer2ConcernAreas, layer2PositiveSignals, layer2Reports, layer2WeekPlanCandidates, weeklyFeedbackFormTable } from "@/lib/config/schema";
import { GoogleGenAI } from "@google/genai";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Invalid AI JSON response");
  }
  return text.slice(start, end + 1);
}

const FEEDBACK_COMPARISON_PROMPT = `
You are a structured health progression analysis AI.

You must:
1. First analyze the weekly feedback independently.
2. Compare it with the previous Layer2 report.
3. Compare against structured concern areas and positive signals.
4. Consider numeric changes (1–5 scale).
5. Consider adherenceScore.
6. Detect red-flag language.
7. Decide new status: GREEN | YELLOW | RED.
8. Decide if escalation is required.

STRICT RULES:
- No medical advice
- No diagnosis
- No treatment recommendations
- No rewriting baseline
- No inventing new concerns
- Return JSON only

-----------------------------------------
PHASE 1 – FEEDBACK ANALYSIS

From weekly feedback:
- Detect improvement signals
- Detect worsening signals
- Detect unresolved concerns
- Detect red-flag language
- Consider numeric changes (1–5 scale)
- Consider tone and sentiment

-----------------------------------------
PHASE 2 – STRUCTURED COMPARISON

For EACH concern area:
Return status:
- resolved
- improving
- unchanged
- worsening

For EACH positive signal:
Return status:
- strengthened
- maintained
- weakened

-----------------------------------------
PHASE 3 – STATUS DECISION RULES

GREEN:
- All moderate/high concerns resolved or clearly improving
- No worsening signals
- No red-flag language

YELLOW:
- Some concerns remain mild/moderate
- Partial improvement
- No strong worsening

RED:
- Concern severity increased
- Multiple areas worsening
- Red-flag language detected

Escalation should be true only if:
- High severity persists or worsens
- OR red-flag signals present


RETURN STRICT JSON:

{
  "sentiment": "positive|neutral|negative",
  "overallTrend": "improving|stable|declining",
  "redFlagDetected": true|false,

  "concernComparisons": [
    {
      "area": "string",
      "previousSeverity": "mild|moderate|high",
      "currentState": "resolved|improving|unchanged|worsening"
    }
  ],

  "positiveSignalComparisons": [
    {
      "signal": "string",
      "previousStrength": "low|medium|high",
      "currentState": "strengthened|maintained|weakened"
    }
  ],

  "newStatus": "GREEN|YELLOW|RED",
  "escalationRequired": true|false,
  "comparisonReasoning": "short structured explanation"
}
`;


export async function POST(req) {
  try {
    const {
      weeklyplanId,
      feedbackText,
      energyLevel,
      stressLevel,
      sleepQuality,
      hydrationLevel,
      activityLevel,
      adherenceScore
    } = await req.json();




    const [weekPlan] = await db
      .select()
      .from(layer2WeekPlanCandidates)
      .where(eq(layer2WeekPlanCandidates.id, weeklyplanId))


    // const layer2ReportId = weekPlan.reportId
    const report = await db
      .select()
      .from(layer2Reports)
      .where(eq(layer2Reports.id, weekPlan.reportId))
      .then(r => r[0]);



    const weekPlanId = weeklyplanId
    const layer2ReportId = report.id

    const finalResult = await db.select().from(finalResultsTable).where(eq(finalResultsTable.userEmail, report.userEmail)).orderBy(desc(finalResultsTable.createdAt)).limit(1).then(rows => rows[0])


    // 1️⃣ Insert initial feedback (user input only)
    const [savedFeedback] = await db.insert(weeklyFeedbackFormTable).values({
      userEmail: report.userEmail,
      weekPlanId,
      layer2ReportId,
      feedbackText,
      energyLevel,
      stressLevel,
      sleepQuality,
      hydrationLevel,
      activityLevel,
      adherenceScore
    }).returning();

    // 2️⃣ Fetch Layer2 baseline


    const concerns = await db
      .select()
      .from(layer2ConcernAreas)
      .where(eq(layer2ConcernAreas.reportId, layer2ReportId));

    const positives = await db
      .select()
      .from(layer2PositiveSignals)
      .where(eq(layer2PositiveSignals.reportId, layer2ReportId));

    // 3️⃣ Call AI
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: { responseMimeType: "text/plain" },
      contents: [
        {
          role: "user",
          parts: [
            { text: FEEDBACK_COMPARISON_PROMPT },
            {
              text: JSON.stringify({
                previousReport: report,
                concernAreas: concerns,
                positiveSignals: positives,
                weeklyFeedback: savedFeedback
              })
            }
          ]
        }
      ]
    });

    const aiText = aiResponse.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(extractJson(aiText));

    // 4️⃣ Update feedback row with AI results
    await db.update(weeklyFeedbackFormTable)
      .set({
        sentiment: parsed.sentiment,
        overallTrend: parsed.overallTrend,
        redFlagDetected: parsed.redFlagDetected,
        concernComparisons: parsed.concernComparisons,
        positiveSignalComparisons: parsed.positiveSignalComparisons,
        newStatus: parsed.newStatus,
        escalationRequired: parsed.escalationRequired,
        comparisonReasoning: parsed.comparisonReasoning
      })
      .where(eq(weeklyFeedbackFormTable.id, savedFeedback.id));

    // 5️⃣ Update Final Layer status
    await db.update(finalResultsTable)
      .set({
        finalStatus: parsed.newStatus
      })
      .where(eq(finalResultsTable.id, finalResult.id));


    //Updated the WeeklyPlan FeedbackForm Completed Status
    await db.update(layer2WeekPlanCandidates).set({
      isFeedBackCompleted: true
    }).where(eq(layer2WeekPlanCandidates.id, weeklyplanId))


    //Updating the History
    // await db.update(diagnosisHistory).set({
    //   weeklyFeedbackFormId: savedFeedback.id,
    // }).where(eq(finalResultsTable.id, finalResult.id))

    return NextResponse.json({
      feedbackId: savedFeedback.id,
      newStatus: parsed.newStatus,
      escalationRequired: parsed.escalationRequired
    });

  } catch (err) {
    console.error("Feedback Comparison Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
