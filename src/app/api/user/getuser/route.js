"use server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { usersTable } from "@/lib/config/schema";
import db from "@/lib/config/db";


export async function GetUser() {
    try {
        const user = await currentUser();

        if (!user) {
            return {
                success: false,
                isUserEnrolled: false,
            };
        }

        const [userdetails] = await db
            .select()
            .from(usersTable)
            .where(
                eq(
                    usersTable.email,
                    user.primaryEmailAddress?.emailAddress ?? ""
                )
            );

        return {
            success: true,
            isUserEnrolled:
                userdetails?.isUserEnrolled ?? false,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            isUserEnrolled: false,
        };
    }
}