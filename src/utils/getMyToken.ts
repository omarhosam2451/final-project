"use server";

import { getServerSession } from "next-auth/next"
import { nextAuthConfig } from "@/lib/nextauth.config"
import { cookies } from "next/headers"

export async function getMyToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const cookieNames = cookieStore.getAll().map(c => c.name);
    console.log("Server Debug - Cookies:", cookieNames);

    const session = await getServerSession(nextAuthConfig)
    const sessionToken = (session as any)?.realTokenFromBackEnd

    if (sessionToken) {
      console.log("Server Debug - Token found in NextAuth session");
      return sessionToken
    } else {
      console.log("Server Debug - getServerSession was called but no 'realTokenFromBackEnd' found.");
    }

    const manualToken = cookieStore.get("token")?.value;

    if (manualToken) {
      console.log("Server Debug - Token retrieved from manual 'token' cookie.");
      return manualToken;
    }

    console.log("Server Debug - FAILED: No valid token could be found in session or cookies.");
    return null;
  } catch (err) {
    console.error("Server Error in getMyToken:", err);
    return null;
  }
}
