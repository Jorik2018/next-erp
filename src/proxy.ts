// src/proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("===== PROXY PURO EJECUTADO =====");
  console.log("URL:", request.url);
  console.log("PATH:", request.nextUrl.pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ["/next/dashboard/:path*"],
};