// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {

//         const cookieStore = await cookies();

//         cookieStore.delete("form1Id")
//         cookieStore.delete("form2Id")
//         cookieStore.delete("layer1ResultId")
//         cookieStore.delete("layer2ReportId")

//         return NextResponse.json({ message: "Ids Deleted successfully" }, { status: 200 })

//     } catch (err) {
//         console.log(err.message)

//         return NextResponse.json({ error: err.message }, { status: 401 })
//     }

// } 





"use server";

import { cookies } from "next/headers";

export async function clearFormCookies() {
    const cookieStore = cookies();

    cookieStore.delete("form1Id");
    cookieStore.delete("form2Id");
    cookieStore.delete("layer1ResultId");
    cookieStore.delete("layer2ReportId");
}