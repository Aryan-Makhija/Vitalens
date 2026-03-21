
import db from "@/lib/config/db";
import { form1Table } from "@/lib/config/schema";
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";



export async function POST(request) {

    const { age, gender, bedtime, wakeUpTime, sleepQuality, activityLevel, steps, foodQuality, waterIntake, stresslevel, mood, energylevel, healthDescription } = await request.json()

    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({
            error: "Unauthorized"
        },
            { status: 401 }

        );
    }
    if (
        !age ||
        !gender ||
        !bedtime ||
        !wakeUpTime ||
        sleepQuality == null ||
        activityLevel == null ||
        steps == null ||
        foodQuality == null ||
        waterIntake == null ||
        stresslevel == null ||
        mood == null ||
        energylevel == null
    ) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }




    const [result] = await db
        .insert(form1Table)
        .values({
            userEmail: user.primaryEmailAddress.emailAddress,
            age,
            gender,
            bedtime,
            wakeUpTime,
            sleepQuality,
            activityLevel,
            steps,
            foodQuality,
            waterIntake,
            stresslevel,
            mood,
            energylevel,
            healthDescription
        })
        .returning();

    return NextResponse.json({
        form1Id: result.id,
        createdAt: result.createdAt
    });

}


