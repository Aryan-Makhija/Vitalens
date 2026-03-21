import db from "@/lib/config/db"
import { layer2Suggestions } from "@/lib/config/schema"
import { currentUser } from "@clerk/nextjs/server"
import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"




export async function GET() {


    try {

        const user = await currentUser()


        if (!user) {
            return NextResponse.json(
                { error: "user not Authenticated" },
                { status: 401 }
            )
        }

        const [suggestion] = await db.select().from(layer2Suggestions).where(eq(layer2Suggestions.id, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(layer2Suggestions.createdAt)).limit(1)


        return NextResponse.json({
            result: suggestion
        })
    } catch (err) {
        return NextResponse.json({
            error: err?.message || "Something went wrong",
            status: 500
        })
    }



}