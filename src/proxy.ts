import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {

  const jwt = await getToken({ req })

  console.log("jwt form middleware", jwt);

  if (jwt == null) {
    return NextResponse.redirect("/login")
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/cart", "/support", "/allproducts"]
}