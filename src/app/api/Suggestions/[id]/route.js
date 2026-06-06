import db from "@/lib/config/db";
import { layer2PositiveSignals, layer2Suggestions } from "@/lib/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";






export async function GET(request, { params }) {
    try {
        const { id } = await  params;
        if (!id) {
            return NextResponse.json({ message: "Id Not Found" }, { status: 404 })
        }

        const [suggestion] = await db.select().from(layer2Suggestions).where(eq(layer2Suggestions.reportId, id))

        return NextResponse.json({
            result: suggestion
        })




    } catch (err) {
        return NextResponse.json({ message: err.message })
    }
}