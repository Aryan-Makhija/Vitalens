import db from "@/lib/config/db";
import { layer2ConcernAreas } from "@/lib/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {



    try {
        const user = await currentUser()


        if (!user) {
            return NextResponse.json(
                { error: "user not Authenticated" },
                { status: 401 }
            )
        }


        const [consernresult] = await db.select().from(layer2ConcernAreas).where(eq(layer2ConcernAreas.userEmail, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(layer2ConcernAreas.createdAt)).limit(1)

        return NextResponse.json({
            result: consernresult
        })

    } catch (err) {

        return NextResponse.json({
            error: err?.message || "Something went wrong",
            status: 500
        })
    }



}


//Important Tip -->

// use either this  .then(rows => rows[0])  or [consernareas ] this not both together in the same queuery becouse they will overide each other both work same that is to make query return the object of the row 