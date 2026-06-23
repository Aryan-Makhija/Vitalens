
import db from "@/lib/config/db";
import { layer2WeekPlanCandidates, weeklyFeedbackFormTable } from "@/lib/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";




export async function GET(_, { params }) {

    try {


        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const { id } = await params;


        const [feedback] = await db.select().from(weeklyFeedbackFormTable).where(eq(weeklyFeedbackFormTable.weekPlanId, id))


        if (!feedback) {
            return NextResponse.json({ message: "Feedback Form Not Found" }, { status: 404 })
        }
        const report = {
            sentiments: feedback.sentiment,
            overallTrend: feedback.overallTrend,
            redFlagDetected: feedback.redFlagDetected,
            concernComparison: feedback.concernComparisons,
            positiveComaparison: feedback.positiveSignalComparisons,
            newStatus: feedback.newStatus,
            escalationRequired: feedback.escalationRequired,
            comparisonReasoning: feedback.comparisonReasoning,
        }



        return NextResponse.json({
            Report: report
        }, { status: 200 })


    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 401 })
    }
}