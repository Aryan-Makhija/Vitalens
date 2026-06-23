import db from "@/lib/config/db";
import { diagnosisHistory, finalResultsTable, layer1ResultsTable } from "@/lib/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";




//Generate History
export async function POST(request) {

    try {

        const { userId } = await auth();

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }


        const { layer2ReportId, finalResultsId } = await request.json();

        if (!layer2ReportId) {
            return NextResponse.json({ message: "layer2ReportId not found" })
        }
        if (!finalResultsId) {
            return NextResponse.json({ message: "finalResultId not found" })
        }


        const [report] = await db.select().from(layer1ResultsTable).where(eq(layer1ResultsTable.id, layer1ResultsTable))

        const [finalreport] = await db.select().from(finalResultsTable).where(eq(finalResultsTable.id, finalResultsId))



        const [result] = await db.insert(diagnosisHistory).values({
            userEmail: report.userEmail,
            layer2ReportId,
            finalResultsId,
            finalStatus: finalreport?.finalStatus,
            statusHeadline: finalreport?.statusHeadline,
            statusSummary: finalreport?.statusSummary
        }).returning()

        return NextResponse.json({
            message: "History generated",
            ResultId: result.id
        })


    } catch (err) {
        return NextResponse.json({
            error: err?.message || "Something went wrong",
            status: 500
        })
    }


}



// Get All History of the user 
export async function GET() {


    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ message: "user not Authenticated" }, { status: 401 })
        }

        const result = await db.select().from(diagnosisHistory).where(eq(diagnosisHistory.userEmail, user.primaryEmailAddress.emailAddress)).orderBy(desc(diagnosisHistory.createdAt))

        return NextResponse.json({
            Allhistory: result
        })

    } catch (err) {
        return NextResponse.json({
            error: err?.message || "Something went wrong",
            status: 500
        })
    }


}
