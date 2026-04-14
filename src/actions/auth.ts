"use server"

import { cookies } from "next/headers"
import { signUp } from "@/app/types/types"

export async function loginUpAction(values: signUp) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
    body: JSON.stringify(values),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const finalRes = await res.json()
  console.log("finalRes", finalRes);

  if (!res.ok) {
    console.log(finalRes.message);
    throw new Error(finalRes.message || "Authentication failed");
  }

  const myCookies = await cookies()
  myCookies.set("token", finalRes.token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    secure: true,
    sameSite: "strict"
  })

  return res.ok;
}

