import db from "@/lib/config/db";
import { diagnosisHistory, finalResultsTable, layer2Reports } from "@/lib/config/schema";
import { currentUser } from "@clerk/nextjs/server";

import { GoogleGenAI } from "@google/genai";
import { desc, eq } from "drizzle-orm";
import { cookies } from "next/headers";
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

// ----------------------------
// 3 Rule-Version Prompts
// ----------------------------
const PROMPT_GREEN = `
You are the FINAL LAYER AI for health governance.


Role:
- Only convert structured Layer 2 report into user-facing communication.
- Do NOT interpret data, generate medical advice, or modify governance fields.


Rules for this version:
- Tone: reassuring and calm
- Emphasize balance and maintenance
- Avoid exaggerated positivity



Output:
- Only generate JSON with:
{

  "statusHeadline": "",
  "statusSummary": "",

}

- Only generate statusHeadline and statusSummary in natural language.
- Maximum 12 words for headline, 5–8 sentences for summary.
- No markdown, no extra fields, no explanations.
`;

const PROMPT_YELLOW = `
You are the FINAL LAYER AI for health governance.

Role:
- Only convert structured Layer 2 report into user-facing communication.
- Do NOT interpret data, generate medical advice, or modify governance fields.


Rules for this version:
- Tone: cautious and attentive, not alarming
- Emphasize monitoring and awareness
- Encourage user attention, but no urgency



Output:
- Only generate JSON with:
{

  "statusHeadline": "",
  "statusSummary": "",
  "CanEnrollWeeklyPlan":true

}


- Only generate statusHeadline and statusSummary in natural language.
- Maximum 12 words for headline, 5–8 sentences for summary.
- No markdown, no extra fields, no explanations.
`;

const PROMPT_RED = `
You are the FINAL LAYER AI for health governance.


Role:
- Only convert structured Layer 2 report into user-facing communication.
- Do NOT interpret data, generate medical advice, or modify governance fields.

Rules for this version:
- Tone: calm, serious, and professional
- Clearly recommend professional medical evaluation
- Do NOT provide reassurance, optimization language, or suggestions


Output:
- Only generate JSON with:
{

  "statusHeadline": "",
  "statusSummary": "",

}


- Only generate statusHeadline and statusSummary in natural language.
- Maximum 12 words for headline, 5–8 sentences for summary.
- No markdown, no extra fields, no explanations.
`;

export async function POST(request) {
    try {
        // const { id } = await params;


        const cookieStore = await cookies();

        const layer2ReportId = cookieStore.get("layer2ReportId")?.value
        // const { layer2ReportId } = await request.json();
        if (!layer2ReportId) {
            return NextResponse.json({ error: "layer2ReportId is required" }, { status: 400 });
        }

        // ----------------------------
        // 1️⃣ Fetch Layer 2 Report
        // ----------------------------
        const layer2Report = await db
            .select()
            .from(layer2Reports)
            .where(eq(layer2Reports.id, layer2ReportId))
            .then(r => r[0]);

        if (!layer2Report) {
            return NextResponse.json({ error: "Layer 2 report not found" }, { status: 404 });
        }

        // ----------------------------
        // 2️⃣ Determine Prompt and Rule Version
        // ----------------------------
        const prompt = layer2Report.status === "GREEN"
            ? PROMPT_GREEN
            : layer2Report.status === "YELLOW"
                ? PROMPT_YELLOW
                : PROMPT_RED;

        const ruleVersion = layer2Report.status === "GREEN"
            ? "v1.0-green"
            : layer2Report.status === "YELLOW"
                ? "v1.0-yellow"
                : "v1.0-red";

        // ----------------------------
        // 3️⃣ Prepare Governance Fields
        // ----------------------------

        const governanceFields =
            layer2Report.status === "GREEN"
                ? {
                    finalStatus: "GREEN",
                    escalationTriggered: false,
                    escalationLevel: "none",

                    showConcerns: true,
                    showPositives: true,
                    showSuggestions: true,
                    showWeeklyPlan: false,

                    ruleVersion,
                }
                : layer2Report.status === "YELLOW"
                    ? {
                        finalStatus: "YELLOW",
                        escalationTriggered: false,
                        escalationLevel:
                            layer2Report.escalationRisk === "possible"
                                ? "advisory"
                                : "none",

                        showConcerns: true,
                        showPositives: true,
                        showSuggestions: true,
                        showWeeklyPlan: true,

                        ruleVersion,
                    }
                    : layer2Report.status === "RED"
                        ? {
                            finalStatus: "RED",
                            escalationTriggered: true,
                            escalationLevel: "immediate",

                            showConcerns: false,
                            showPositives: false,
                            showSuggestions: false,
                            showWeeklyPlan: false,

                            ruleVersion,
                        }
                        : null;

        // ----------------------------
        // 4️⃣ AI Prompt with Layer 2 + Governance
        // ----------------------------
        const aiPrompt = `
${prompt}

Layer 2 Report:
${JSON.stringify(layer2Report, null, 2)}



`;

        // ----------------------------
        // 5️⃣ Call AI
        // ----------------------------
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: { responseMimeType: "text/plain" },
            contents: [
                {
                    role: "user",
                    parts: [{ text: aiPrompt }]
                }
            ]
        });

        const aiText = response.candidates[0].content.parts[0].text;


        // ----------------------------
        // 6️⃣ Parse AI JSON
        // ----------------------------

        let finalLayerOutput;

        try {
            finalLayerOutput = JSON.parse(extractJson(aiText));
        } catch (err) {
            console.error("AI JSON parsing error:", err, aiText);
            return NextResponse.json({ error: "AI response is not valid JSON" }, { status: 500 });
        }

        //     //  Stops Enrolling in the Previous Plan 
        //  const [report] = await  db
        //                       .update(finalResultsTable)
        //                       .set({
        //                           CanEnroll_WeeklyPlan: false,
        //                       })
        //                       .where(eq(userEmail, layer2Report.userEmail))




        //     // ----------------------------
        //     // 7️⃣ Store in final_results table
        //     // ----------------------------
        //     const [saved] = await db
        //         .insert(finalResultsTable)
        //         .values({
        //             userEmail: layer2Report.userEmail,
        //             layer2ReportId,
        //             ...finalLayerOutput,
        //             ...governanceFields
        //         })
        //         .returning();


        //     // -----------------------------------
        //     //  Maintaining the Diagnosis history
        //     // ----------------------------------




        const [, saved] = await Promise.all([
            // Stop enrolling in previous plan
            db
                .update(finalResultsTable)
                .set({
                    CanEnrollWeeklyPlan: false,
                })
                .where(eq(userEmail, layer2Report.userEmail)),

            // Store in final_results table
            db
                .insert(finalResultsTable)
                .values({
                    userEmail: layer2Report.userEmail,
                    layer2ReportId,
                    ...finalLayerOutput,
                    ...governanceFields,
                })
                .returning()
                .then(([result]) => result),
        ]);

        // Maintain diagnosis history
        await db.insert(diagnosisHistory).values({
            userEmail: layer2Report.userEmail,
            layer2ReportId,
            finalResultsId: saved.id,
            finalStatus: saved.finalStatus,
            statusHeadline: saved.statusHeadline,
            statusSummary: saved.statusSummary,
        });

        // await db.transaction(async (tx) => {
        //     const [saved] = await tx
        //         .insert(finalResultsTable)
        //         .values({
        //             userEmail: layer2Report.userEmail,
        //             layer2ReportId,
        //             ...finalLayerOutput,
        //             ...governanceFields
        //         })
        //         .returning();

        //     await tx.insert(diagnosisHistory).values({
        //         userEmail: layer2Report.userEmail,
        //         layer2ReportId,
        //         finalResultsId: saved.id,
        //         finalStatus: saved.finalStatus,
        //         statusHeadline: saved.statusHeadline,
        //         statusSummary: saved.statusSummary,
        //     });
        // });

        // ----------------------------
        // 8️⃣ Return response
        // ----------------------------



        cookieStore.delete("form1Id")
        cookieStore.delete("form2Id")
        cookieStore.delete("layer1ResultId")
        cookieStore.delete("layer2ReportId")

        return NextResponse.json({ finalResult: saved });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

//Return only valid JSON with keys:
//finalStatus, escalationTriggered, escalationLevel, statusHeadline, statusSummary, showConcerns, showPositives, showSuggestions, showWeeklyPlan, ruleVersion

// const governanceFields = {
//     finalStatus: layer2Report.status,
//     escalationTriggered: layer2Report.escalationRisk === "immediate",
//     escalationLevel:
//         layer2Report.escalationRisk === "immediate"
//             ? "immediate"
//             : layer2Report.escalationRisk === "possible"
//                 ? "advisory"
//                 : "none",
//     showConcerns: layer2Report.showConcerns ?? false,
//     showPositives: layer2Report.showPositives ?? false,
//     showSuggestions: layer2Report.showSuggestions ?? false,
//     showWeeklyPlan:
//         layer2Report.showWeeklyPlan && layer2Report.status === "YELLOW" ? true : false,
//     ruleVersion,
// };







export async function GET() {


    try {

        const user = await currentUser();


        if (!user) {
            return NextResponse.json({
                error: "user not Authenticated",
                status: 401
            })
        }


        const [finalresult] = await db.select().from(finalResultsTable).where(eq(finalResultsTable.userEmail, user.primaryEmailAddress.emailAddress)).orderBy(desc(finalResultsTable.createdAt)).limit(1)


        return NextResponse.json({
            result: finalresult
        })
    } catch (err) {
        return NextResponse.json(err.message)
    }



}