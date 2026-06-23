import db from "@/lib/config/db";
import { finalResultsTable, layer2WeekPlanCandidates, usersTable } from "@/lib/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";



export async function GET(request) {


    try {


        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const requestedDay = searchParams.get("day");

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
        // const today = new Date();
        // const startDate = new Date(plan.startedAt);


        // const diffTime = today.getTime() - startDate.getTime();
        // const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const now = new Date();
        const startDate = new Date(plan.startedAt);
        // console.log(startDate)

        // Convert both to IST calendar dates
        const todayIST = new Date(
            now.toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            })
        );

        const startIST = new Date(
            startDate.toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            })
        );

        // Remove time portion
        todayIST.setHours(0, 0, 0, 0);
        startIST.setHours(0, 0, 0, 0);

        const diffTime = todayIST - startIST;

        const daysPassed = Math.floor(
            diffTime / (1000 * 60 * 60 * 24)
        );

        const currentDay = Math.min(daysPassed + 1, 7);
        if (currentDay === 7 && !plan.isCompleted) {

            await Promise.all([

                db
                    .update(layer2WeekPlanCandidates)
                    .set({
                        isCompleted: true,
                    })
                    .where(eq(layer2WeekPlanCandidates.id, plan.id)),


                db.update(usersTable).set({
                    isUserEnrolled: false
                }).where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))
            ])
        }





        let dayToShow = currentDay;

        // 🔹 If user requested specific day
        if (requestedDay) {
            const parsedDay = Number(requestedDay);

            if (parsedDay > currentDay || parsedDay < 1) {
                return NextResponse.json(
                    { error: "Day not unlocked" },
                    { status: 403 }
                );
            }

            dayToShow = parsedDay;
        }

        const task = plan.dailyActions[dayToShow - 1];



        const [finalLayer] = await db.select().from(finalResultsTable).where(eq(finalResultsTable.layer2ReportId, plan.reportId))

        const result = {
            id: plan.id,
            currentDay: currentDay,      // Used to build buttons
            showingDay: dayToShow,
            TodayTask: task,
            plantype: plan.planType,
            goalfocus: plan.goalFocus,
            difficultyLevel: plan.difficultyLevel,
            safetyLevel: plan.safetyLevel,
            startedAt: plan.startedAt,
            layer2ReportId: plan?.reportId || null,
            isCompleted: plan.isCompleted,
            isFeedBackCompleted: plan.isFeedBackCompleted,
            finalLayerId: finalLayer.id
        }
        return NextResponse.json({
            result: result

        }, { status: 200 });
    } catch (err) {

        return NextResponse.json(
            { error: err?.message || "Internal server error" },
            { status: 500 }
        );

    }
}





export async function PUT() {
    try {
        const user = await currentUser();

        if (!user?.primaryEmailAddress?.emailAddress) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const email = user.primaryEmailAddress.emailAddress;

        // Run queries in parallel for better performance
        const [planResult, userResult] = await Promise.all([
            db
                .select()
                .from(layer2WeekPlanCandidates)
                .where(eq(layer2WeekPlanCandidates.userEmail, email))
                .orderBy(desc(layer2WeekPlanCandidates.createdAt))
                .limit(1),

            db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, email))
                .limit(1),
        ]);

        const plan = planResult[0];
        const userDetails = userResult[0];

        if (!plan) {
            return NextResponse.json(
                { success: false, message: "Plan not found" },
                { status: 404 }
            );
        }

        if (!userDetails) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Run updates in parallel
        await Promise.all([
            db
                .update(layer2WeekPlanCandidates)
                .set({
                    startedAt: new Date(),
                    updatedAt: new Date(), // if you have this column
                })
                .where(eq(layer2WeekPlanCandidates.id, plan.id)),

            db
                .update(usersTable)
                .set({
                    isUserEnrolled: true,
                })
                .where(eq(usersTable.email, email)),
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "User enrolled successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Enrollment PUT Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

