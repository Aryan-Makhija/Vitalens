
import db from "@/lib/config/db";
import { layer2WeekPlanCandidates, usersTable } from "@/lib/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {


    try {

        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }


        const [userdetails] = await db.select().from(usersTable).where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))

        if (!userdetails) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }


        return NextResponse.json({
            IsEnrolled: userdetails.isUserEnrolled
        })

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

}