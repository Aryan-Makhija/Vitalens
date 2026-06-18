
import db from "@/lib/config/db";
import { form1Table, layer1ResultsTable } from "@/lib/config/schema";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { eq } from "drizzle-orm"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const PROMPT = `
You are an AI health interpretation engine.

STRICT RULES:
- Interpretation ONLY
- NO advice
- NO recommendations
- NO reassurance
- NO diagnosis
- NO markdown
- NO explanations
- Output MUST be valid JSON only

TASKS:
1. Normalize numeric and scale inputs to values between 0 and 1
2. Analyze habit balance
3. Detect habit mismatches (example: good sleep but low energy)
4. Interpret free-text input:
   - sentiment: positive | neutral | negative
   - severity: low | medium | high
   - concernType: physical | mental | both
   - detect red-flag phrases
5. Determine:
   - severityLevel
   - redFlagDetected
   - interpretationConfidence (0–1)
   - needsMoreContext
6. Decide:
   - form2Required
   - recommendedForm2Modules
7. Assign layer1Status:
   GREEN | YELLOW | RED

RETURN JSON ONLY USING THIS SCHEMA:
{
  "normalizedScores": {
    "sleep": number,
    "activity": number,
    "food": number,
    "hydration": number,
    "stress": number,
    "energy": number
  },
  "habitBalanceScore": number,
  "detectedMismatches": [
    { "type": string, "description": string, "severity": "low|medium|high" }
  ],
  "freeTextAnalysis": {
    "sentiment": "positive|neutral|negative",
    "severity": "low|medium|high",
    "concernType": "physical|mental|both",
    "redFlagPhrases": string[]
  },
  "severityLevel": "low|medium|high",
  "concernType": "physical|mental|both",
  "redFlagDetected": boolean,
  "interpretationConfidence": number,
  "needsMoreContext": boolean,
  "form2Required": boolean,
  "requiredContextModules": {
    "GENERAL_HEALTH_SAFETY": boolean,
    "PAIN_PHYSICAL_LIMITATION": boolean,
    "STRESS_MENTAL_LOAD": boolean,
    "MEDICAL_LIFESTYLE": boolean
  },
  "layer1Status": "GREEN|YELLOW|RED"
}
`;

export async function POST(req) {


  //Auhthentication

  // const { userId } = await auth();
  // if (!userId) {
  //   return NextResponse.json({ error: "Unauhorized" }, { status: 401 });
  // }


  const cookieStore = await cookies()
  const form1Id = cookieStore.get("form1Id")?.value;

  if (!form1Id) {
    return NextResponse.json({ error: "No Form1 Id Found" }, { status: 400 });
  }



  // const { form1id} = await req.json();

  // 1️⃣ Fetch Form 1
  const form1 = await db
    .select()
    .from(form1Table)
    .where(eq(form1Table.id, form1Id))
    .then(r => r[0]);

  if (!form1) {
    return NextResponse("Form 1 not found", { status: 404 });
  }

  // 2️⃣ Gemini call
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: { responseMimeType: "text/plain" },
    contents: [
      {
        role: "user",
        parts: [
          { text: PROMPT },
          {
            text: JSON.stringify({
              form1: { ...form1, userEmail: undefined },
            })
          }
        ]
      }
    ]
  });

  // 3️⃣ Parse JSON safely
  const text = response.candidates[0].content.parts[0].text;
  const layer1Output = JSON.parse(text);

  // 4️⃣ Store in DB
  const [saved] = await db
    .insert(layer1ResultsTable)
    .values({
      form1Id,
      userEmail: form1.userEmail,
      ...layer1Output
    })
    .returning();

  // 5️⃣ User-safe response
  const userResponse =
    saved.layer1Status === "GREEN"
      ? {
        status: "received",
        message: "Thanks — your check-in has been recorded.",
        nextStep: "insights_processing"
      }
      : saved.layer1Status === "YELLOW"
        ? {
          status: "needs_more_context",
          message: "A bit more context will help us understand today better.",
          nextStep: "form2",
          modules: saved.requiredContextModules
        }
        : {
          status: "important_check",
          message: "We want to review this carefully before continuing.",
          nextStep: "form2_or_support",
          modules: saved.requiredContextModules
        };


  cookieStore.set("layer1ResultId", saved.id, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 30,

  })




  return Response.json({
    userResponse,
    systemResponse: {
      layer1ResultId: saved.id,
      layer1Status: saved.layer1Status,
      form2Required: saved.form2Required,
      requiredContextModules: saved.requiredContextModules
    }
  });
}

