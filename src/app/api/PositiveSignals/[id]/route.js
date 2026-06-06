import db from "@/lib/config/db";
import { layer2PositiveSignals } from "@/lib/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";






export async function GET(request, { params }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ message: "Id Not Found" }, { status: 404 })
        }

        const [positive] = await db.select().from(layer2PositiveSignals).where(eq(layer2PositiveSignals.reportId, id))

        return NextResponse.json({
            result: positive
        })




    } catch (err) {
        return NextResponse.json({ message: err.message })
    }
}