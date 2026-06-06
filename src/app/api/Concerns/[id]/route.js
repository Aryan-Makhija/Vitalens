import db from "@/lib/config/db"
import { layer2ConcernAreas } from "@/lib/config/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


export async function GET(request,{params}) {

    try {
        const { id } = await  params
        if (!id) {
            return NextResponse.json({ message: "Id Not Found" }, { status: 404 })
        }
        const [concerns] = await db.select().from(layer2ConcernAreas).where(eq(layer2ConcernAreas.reportId, id))


        return NextResponse.json({
            result: concerns
        })
    } catch (err) {
        return NextResponse.json({ message: err.message })
    }
}