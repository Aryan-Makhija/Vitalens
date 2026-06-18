import db from "@/lib/config/db";
import {
    form1Table,
    form2Table,
    layer1ResultsTable,
    layer2Reports,
    layer2PositiveSignals,
    layer2ConcernAreas,
    layer2Suggestions,
    layer2WeekPlanCandidates
} from "@/lib/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


/* ---------------------------
   Utility: Safe JSON Extract
---------------------------- */
function extractJson(text) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
        throw new Error("Invalid AI JSON response");
    }
    return text.slice(start, end + 1);
}


// ---------------------------
// 1️⃣ Layer 2 AI Prompt
// ---------------------------
const LAYER2_PROMPT = `
You are an AI health analyst (Layer 2). 
Analyze the user's data from Form1, Form2, and Layer1 outputs.

STRICT RULES:
- NO medical advice
- NO diagnosis
- NO reassurance
- NO treatment plans
- NO absolute guarantees
- Use humble, non-authoritative phrasing inside suggestions and dailyActions
- Weekly plan must be supportive, not demanding
- Output MUST be valid JSON only
- Output MUST strictly match schema



TASKS:
1. Analyze habit patterns, trends, and concerns
2. Identify positive signals
3. Identify concern areas
4. Provide suggestions (allowed/blocked)
5. Determine user status: GREEN | YELLOW | RED
6. Generate weekPlanCandidates ONLY IF status = YELLOW



WEEKLY PLAN GENERATION RULES (ONLY FOR YELLOW):

The weekly plan represents a 7-day stabilization structure.
It must:
- Be gentle and progressive
- Be based on user's baseline capacity (never aggressive improvement)
- Avoid performance pressure
- Avoid competitive or gamified tone
- Focus on stabilization, not optimization
- Contain exactly 7 dailyActions (one per day)
- Each daily action must be measurable but flexible
- Each action must sound like a humble request (e.g., "If comfortable, consider...")
- Daily progression should increase gradually OR remain stable if needed
- Increase difficulty by small increments (5–15% max) if trend is stable
- If energy/stress is fragile, maintain same level across days instead of increasing
- Do NOT use strong directives (no "must", "should", "push", "achieve")
- Do NOT reference medical conditions
- Do NOT include emergency language
- Keep safetyLevel = "high"
- difficultyLevel must reflect user's current capacity (low for fragile trends, medium for stable trends)

Examples of tone style (not to be copied literally):
- "If comfortable, aim for approximately 1000 steps today."
- "If manageable, try adding a short 5-minute walk."
- "If energy allows, slightly increase hydration consistency."

Daily actions must:
- Be short (1–2 sentences max)
- Focus on one small measurable target per day
- Be realistic relative to user's reported data
- Avoid drastic jumps between days
- Remain within stabilization scope



RETURN JSON ONLY USING THIS SCHEMA:

{
  "report": {
    "overallPattern": "string",
    "primaryConcernDomain": "physical|mental|both",
    "secondaryConcernDomain": "physical|mental|both|null",
    "trendDirection": "improving|stable|declining",
    "contextCompleteness": "low|medium|high",
    "overallConfidence": 0.0,
    "needsMoreData": true|false,
    "toneGuidance": "reassuring|cautious|neutral",
    "status": "GREEN|YELLOW|RED",
    "statusReason": "string",
    "escalationRisk": "none|possible|immediate",
    "systemFlags": {
      "watchClosely": true|false,
      "earlyEscalationPossible": true|false
    }
  },
   
 "positiveSignals": [
  {"signal":"string","strength":"low|medium|high","confidence":0.0}],
  
 "concernAreas": [
  {"area":"string","severity":"mild|moderate|high","possibleDrivers":["string"],"confidence":0.0}
 ],

 "suggestions": [
  {"suggestion":"string","suggestionType":"behavioral|physical|recovery|lifestyle","status":"allowed|blocked","riskLevel":"low|medium|high","reason":"string|null","requiresFollowUp":true|false}
 ],

 "weekPlanCandidates": [
  {
    "planType":"stabilization|recovery|balance",
    "goalFocus":"energy|stress|sleep|activity",
    "difficultyLevel":"low|medium",
  "dailyActions":[
      {
        "taskTitle":"string (Day 1 title)",
        "task":"string (Day 1 action, 1–2 sentences, humble tone)",
        "taskDuration":"string (e.g., '5 minutes', '10–15 minutes')",
        "taskIntensity":"low|medium",
        "taskFocusArea":"energy|stress|sleep|activity"
      },
      {
        "taskTitle":"string (Day 2 title)",
        "task":"string",
        "taskDuration":"string",
        "taskIntensity":"low|medium",
        "taskFocusArea":"energy|stress|sleep|activity"
      },
      {
        "taskTitle":"string (Day 3 title)",
        "task":"string",
        "taskDuration":"string",
        "taskIntensity":"low|medium",
        "taskFocusArea":"energy|stress|sleep|activity"
      },
      {
        "taskTitle":"string (Day 4 title)",
        "task":"string",
        "taskDuration":"string",
        "taskIntensity":"low|medium",
        "taskFocusArea":"energy|stress|sleep|activity"
      },
      {
        "taskTitle":"string (Day 5 title)",
        "task":"string",
        "taskDuration":"string",
        "taskIntensity":"low|medium",
        "taskFocusArea":"energy|stress|sleep|activity"
      },
      {
        "taskTitle":"string (Day 6 title)",
        "task":"string",
        "taskDuration":"string",
        "taskIntensity":"low|medium",
        "taskFocusArea":"energy|stress|sleep|activity"
      },
      {
        "taskTitle":"string (Day 7 title)",
        "task":"string",
        "taskDuration":"string",
        "taskIntensity":"low|medium",
        "taskFocusArea":"energy|stress|sleep|activity"
      }
    ],
    "safetyLevel":"high"
  }
 ]
}
`;


export async function POST(request) {
    try {
        // Auhtentication
        // const {userId} = auth();
        // if(!userId){ 
        //      return NextResponse.json({error:"Unauthorized"},{status:401})
        // }


        const cookieStore = await cookies();


//Getting Ids from Cookies
        const form1Id = cookieStore.get("form1Id")?.value
        const form2Id = cookieStore.get("form2Id")?.value
        const layer1ResultId = cookieStore.get("layer1ResultId")?.value



       if (!form1Id) {
           return NextResponse.json({ error: "No Form1 Id Found" }, { status: 400 });
          }
           if (!form2Id) {
        return NextResponse.json({ error: "No Form2 Id Found" }, { status: 400 });
             }
        if (!layer1ResultId) {
        return NextResponse.json({ error: "No layer1ResultId  Found" }, { status: 400 });
         }


        // const { form1Id,form2Id, layer1ResultId } = await request.json();

        // ---------------------------
        // 2️⃣ Fetch all data
        // ---------------------------

        const user = await currentUser()
        const form1 = await db.select().from(form1Table).where(eq(form1Table.id, form1Id)).then(r => r[0]);
        if (!form1) return NextResponse.json({ error: "Form1 not found" }, { status: 404 });

        const form2 = form2Id
            ? await db.select().from(form2Table).where(eq(form2Table.id, form2Id)).then(r => r[0])
            : null;

        const layer1 = await db.select().from(layer1ResultsTable).where(eq(layer1ResultsTable.id, layer1ResultId)).then(r => r[0]);
        if (!layer1) return NextResponse.json({ error: "Layer1 results not found" }, { status: 404 });

        // ---------------------------
        // 3️⃣ Call AI
        // ---------------------------
        const aiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: { responseMimeType: "text/plain" },
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: LAYER2_PROMPT },
                        {
                            text: JSON.stringify({
                                form1: { ...form1, userEmail: undefined }, // remove userEmail
                                form2: form2 ? { ...form2, userEmail: undefined } : null,
                                layer1: { ...layer1, userEmail: undefined } // remove userEmail
                            })
                        }
                    ]
                }
            ]
        });


        const aiText = aiResponse.candidates[0].content.parts[0].text
        if (!aiText) throw new Error("AI returned empty response");

        const parsed = JSON.parse(extractJson(aiText));

        // ---------------------------
        // 4️⃣ Store Layer2 Report
        // ---------------------------
        const [savedReport] = await db.insert(layer2Reports).values({
            userEmail: user.primaryEmailAddress.emailAddress,
            form1Id: form1Id,
            form2Id: form2Id ?? null,
            layer1ResultId: layer1ResultId,
            overallPattern: parsed.report.overallPattern,
            primaryConcernDomain: parsed.report.primaryConcernDomain,
            secondaryConcernDomain: parsed.report.secondaryConcernDomain ?? null,
            trendDirection: parsed.report.trendDirection,
            contextCompleteness: parsed.report.contextCompleteness,
            overallConfidence: parsed.report.overallConfidence,
            needsMoreData: parsed.report.needsMoreData,
            toneGuidance: parsed.report.toneGuidance,
            systemFlags: parsed.report.systemFlags,
            status: parsed.report.status,
            statusReason: parsed.report.statusReason,
            escalationRisk: parsed.report.escalationRisk
        }).returning();

        const reportId = savedReport.id;

        // Positive Signals
        if (parsed.positiveSignals?.length) {
            await db.insert(layer2PositiveSignals).values(
                parsed.positiveSignals.map((s) => ({
                    reportId,
                    userEmail: user.primaryEmailAddress.emailAddress,
                    signal: s.signal,
                    strength: s.strength,
                    confidence: s.confidence
                }))
            );
        }

        // Concern Areas
        if (parsed.concernAreas?.length) {
            await db.insert(layer2ConcernAreas).values(
                parsed.concernAreas.map((c) => ({
                    reportId,
                    userEmail: user.primaryEmailAddress.emailAddress,
                    area: c.area,
                    severity: c.severity,
                    possibleDrivers: c.possibleDrivers,
                    confidence: c.confidence
                }))
            );
        }

        // Suggestions
        if (parsed.suggestions?.length) {
            await db.insert(layer2Suggestions).values(
                parsed.suggestions.map((s) => ({
                    reportId,
                    userEmail: user.primaryEmailAddress.emailAddress,
                    suggestion: s.suggestion,
                    suggestionType: s.suggestionType,
                    status: s.status,
                    riskLevel: s.riskLevel,
                    reason: s.reason ?? null,
                    requiresFollowUp: s.requiresFollowUp
                }))
            );
        }

        // Weekly Plan Candidates ONLY if status=YELLOW
        if (parsed.report.status === "YELLOW" && parsed.weekPlanCandidates?.length) {
            await db.insert(layer2WeekPlanCandidates).values(
                parsed.weekPlanCandidates.map((w) => ({
                    reportId,
                    userEmail: user.primaryEmailAddress.emailAddress,
                    planType: w.planType,
                    goalFocus: w.goalFocus,
                    difficultyLevel: w.difficultyLevel,
                    dailyActions: w.dailyActions,
                    safetyLevel: w.safetyLevel
                }))
            );
        }

        // ---------------------------
        // 5️⃣ Response
        // ---------------------------
  cookieStore.set("layer2ReportId",reportId,{
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    path:'/',
    maxAge:60*30

})

        return NextResponse.json({
            reportId,
            status: parsed.report.status
        });

    } catch (err) {
        console.error("Layer2 API Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}







// const LAYER2_PROMPT = `
// You are an AI health analyst (Layer 2). 
// Analyze the user's data from Form1, Form2, and Layer1 outputs.

// STRICT RULES:
// - NO medical advice
// - NO diagnosis
// - NO reassurance
// - NO treatment plans
// - Output MUST be valid JSON only
// - Output MUST strictly match schema



// TASKS:
// 1. Analyze habit patterns, trends, and concerns
// 2. Identify positive signals
// 3. Identify concern areas
// 4. Provide suggestions (allowed/blocked)
// 5. Determine user status: GREEN | YELLOW | RED
// 6. Generate weekly plan candidates ONLY IF status=YELLOW

// RETURN JSON ONLY USING THIS SCHEMA:

// {
//   "report": {
//     "overallPattern": "string",
//     "primaryConcernDomain": "physical|mental|both",
//     "secondaryConcernDomain": "physical|mental|both|null",
//     "trendDirection": "improving|stable|declining",
//     "contextCompleteness": "low|medium|high",
//     "overallConfidence": 0.0,
//     "needsMoreData": true|false,
//     "toneGuidance": "reassuring|cautious|neutral",
//     "status": "GREEN|YELLOW|RED",
//     "statusReason": "string",
//     "escalationRisk": "none|possible|immediate",
//     "systemFlags": {
//       "watchClosely": true|false,
//       "earlyEscalationPossible": true|false
//     }
//   },
   
//  "positiveSignals": [
//   {"signal":"string","strength":"low|medium|high","confidence":0.0}],
  
//    "concernAreas": [{"area":"string","severity":"mild|moderate|high","possibleDrivers":["string"],"confidence":0.0}],

//   "suggestions": [{"suggestion":"string","suggestionType":"behavioral|physical|recovery|lifestyle","status":"allowed|blocked","riskLevel":"low|medium|high","reason":"string|null","requiresFollowUp":true|false}],

//   "weekPlanCandidates": [{"planType":"stabilization|recovery|balance","goalFocus":"energy|stress|sleep|activity","difficultyLevel":"low|medium","dailyActions":["string"],"safetyLevel":"high"}]
 
 
// }
// `;

