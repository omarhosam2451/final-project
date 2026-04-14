"use client"
import { SessionProvider } from "next-auth/react";

export function MySessionProvider({children}:any) {
    return(
        <>
        <SessionProvider>
        {children}
        </SessionProvider>
        </>
    )
}