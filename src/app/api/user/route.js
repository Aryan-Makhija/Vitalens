
import db from "@/lib/config/db"
import { usersTable } from "@/lib/config/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"



export async function POST(request) {

    const { email, name } = await request.json()


    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))


    if (user?.length === 0) {
        const result = await db.insert(usersTable).values({
            name: name,
            email: email
        }).returning(usersTable)


        return NextResponse.json(result)
    }

    return NextResponse.json(user[0])

}