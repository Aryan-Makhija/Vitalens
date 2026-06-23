
"use server";

import { cookies } from "next/headers";

export async function clearFormCookies() {
    const cookieStore = cookies();

    cookieStore.delete("form1Id");
    cookieStore.delete("form2Id");
    cookieStore.delete("layer1ResultId");
    cookieStore.delete("layer2ReportId");
}