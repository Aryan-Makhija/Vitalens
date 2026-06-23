import db from "@/lib/config/db"
import { diagnosisHistory } from "@/lib/config/schema"
import { currentUser } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"



export async function GET(_, { params }) {

    try {

        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const { id } = await params;



        if (!historyid) {
            return NextResponse.json(
                { error: "historyid is required" },
                { status: 400 }
            );
        }


        const [result] = await db.select().from(diagnosisHistory).where(and(
            eq(diagnosisHistory.userEmail, user?.primaryEmailAddress?.emailAddress),
            eq(diagnosisHistory.id, id)
        ))


        return NextResponse({
            ResultHistory: result
        })
    } catch (err) {

        return NextResponse.json({
            error: err?.message || "Something went wrong",
            status: 500
        })

    }



}