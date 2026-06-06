import db from "@/lib/config/db"
import { form2Table } from "@/lib/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(request) {


    try {



        const body = await request.json()

        const user = await currentUser();


        const cookieStore = await cookies();
        const form1Id = cookieStore.get("form1Id")?.value



        if (!user?.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({
                error: "Unauthorized"
            },
                { status: 401 }

            );
        }

        const [result] = await db.insert(form2Table).values({
            form1Id: form1Id,
            userEmail: user.primaryEmailAddress.emailAddress,

            /* ─────────────────────────────
               MODULE 1: General Health Safety
               ───────────────────────────── */
            hasOngoingCondition:
                typeof body.hasOngoingCondition === "boolean"
                    ? body.hasOngoingCondition
                    : null,

            conditionTypes:
                body.hasOngoingCondition ? body.conditionTypes ?? null : null,

            conditionOtherText:
                body.conditionTypes?.includes("Other")
                    ? body.conditionOtherText ?? null
                    : null,

            /* ─────────────────────────────
               MODULE 2: Pain & Physical Limitation
               ───────────────────────────── */
            painSeverity: body.painSeverity ?? null,

            painLocations:
                body.painSeverity && body.painSeverity !== "No"
                    ? body.painLocations ?? null
                    : null,

            painAffectsMovement:
                body.painSeverity && body.painSeverity !== "No"
                    ? body.painAffectsMovement ?? null
                    : null,

            /* ─────────────────────────────
               MODULE 3: Stress & Mental Load
               ───────────────────────────── */
            stressType: body.stressType ?? null,
            stressDuration: body.stressDuration ?? null,

            /* ─────────────────────────────
               MODULE 4: Medical / Lifestyle Context
               ───────────────────────────── */
            recoveringFromIllness:
                body.preferNotToSayMedical ? null : body.recoveringFromIllness ?? null,

            onMedicationAffectingEnergy:
                body.preferNotToSayMedical
                    ? null
                    : body.onMedicationAffectingEnergy ?? null,

            managingLongTermCondition:
                body.preferNotToSayMedical
                    ? null
                    : body.managingLongTermCondition ?? null,

            preferNotToSayMedical:
                typeof body.preferNotToSayMedical === "boolean"
                    ? body.preferNotToSayMedical
                    : null,
        }).returning();


        cookieStore.set("form2Id", result.id, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 30
        })

        return NextResponse.json({
            form2Id: result.id,
            createdAt: result.createdAt
        })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }






}