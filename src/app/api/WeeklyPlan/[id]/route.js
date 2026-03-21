import db from "@/lib/config/db";
import { layer2WeekPlanCandidates } from "@/lib/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";



export async function GET(_, { params }) {


    try {


        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }


        const { day } = await params
        // const { searchParams } = new URL(request.url);
        // const requestedDay = searchParams.get("day");

        const [plan] = await db
            .select()
            .from(layer2WeekPlanCandidates)
            .where(
                eq(
                    layer2WeekPlanCandidates.userEmail,
                    user?.primaryEmailAddress?.emailAddress
                )
            )
            .orderBy(desc(layer2WeekPlanCandidates.createdAt))
            .limit(1)

        if (!plan || !plan.startedAt) {
            return NextResponse.json(
                { error: "Plan not started yet" },
                { status: 400 }
            );
        }

        // 🔹 Calculate current unlocked day
        const today = new Date();
        const startDate = new Date(plan.startedAt);

        const diffTime = today.getTime() - startDate.getTime();
        const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const currentDay = Math.min(daysPassed + 1, 7);

        let dayToShow = currentDay;

        // 🔹 If user requested specific day
        if (day) {
            const parsedDay = Number(day);

            if (parsedDay > currentDay || parsedDay < 1) {
                return NextResponse.json(
                    { error: "Day not unlocked" },
                    { status: 403 }
                );
            }

            dayToShow = parsedDay;
        }

        const task = plan.dailyActions[dayToShow - 1];

        return NextResponse.json({
            currentDay,      // Used to build buttons
            showingDay: dayToShow,
            task,
        });
    } catch (err) {

        return NextResponse.json(
            { error: err?.message || "Internal server error" },
            { status: 500 }
        );

    }
}