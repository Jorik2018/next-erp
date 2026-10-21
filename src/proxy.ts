// src/proxy.ts

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((request) => {
  console.log("PROXY PATH:", request.nextUrl.pathname);
  console.log("PROXY AUTH:", request.auth);

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};