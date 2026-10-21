// src/proxy.ts

import NextAuth from "next-auth";
import type {
  NextRequest,
  NextFetchEvent,
} from "next/server";

import { authConfig } from "../auth.config";

const { auth } = NextAuth(authConfig);

const authMiddleware = auth as unknown as (
  request: NextRequest,
  event: NextFetchEvent,
) => Response | Promise<Response | void> | void;

export function proxy(
  request: NextRequest,
  event: NextFetchEvent,
) {
  return authMiddleware(request, event);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};