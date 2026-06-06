import db from "@/lib/config/db";
import { diagnosisHistory, finalResultsTable } from "@/lib/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";



export async function GET(request, { params }) {
    try {


        const { id } = await params;
        if (!id) {
            return NextResponse.json({ message: "Id Not Found Final layer" }, { status: 404 })
        }
        const [report] = await db.select().from(finalResultsTable).where(eq(finalResultsTable.id, id))


        return NextResponse.json({
            result: report
        })


    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: err.message }, { status: 401 })
    }


}