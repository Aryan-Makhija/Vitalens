
import db from "@/lib/config/db";
import { form1Table } from "@/lib/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(request) {

    const { age, gender, bedtime, wakeUpTime, sleepQuality, activityLevel, steps, foodQuality, waterIntake, stresslevel, mood, energylevel, healthDescription } = await request.json()

    const user = await currentUser();


    const cookieStore = await cookies();

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


    cookieStore.set("form1Id", result.id, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 30,
    })


    return NextResponse.json({
        form1Id: result.id,
        createdAt: result.createdAt
    });

}


