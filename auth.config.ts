import { getConfig } from "@/lib/config";
import type { NextAuthConfig } from "next-auth";

const config = await getConfig();

console.log(
  "AUTH CONFIG LOADED:",
  config.authSecret ? "SECRET OK" : "NO SECRET",
);

export const authConfig = {
  trustHost: true,
  secret: config.authSecret,

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [],

  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl, headers } = request;

      const isLoggedIn = !!auth?.user;

      const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/admin");

      if (isProtectedRoute && !isLoggedIn) {
        const proto = headers.get("x-forwarded-proto") ?? "https";

        const host = headers.get("x-forwarded-host") ??
          headers.get("host");

        if (!host) {
          return false;
        }

        const publicOrigin = `${proto}://${host}`;

        const callbackUrl =
          `${publicOrigin}/next${nextUrl.pathname}${nextUrl.search}`;

        const loginUrl = new URL(`${publicOrigin}/next/login`);

        loginUrl.searchParams.set(
          "callbackUrl",
          callbackUrl,
        );

        return Response.redirect(loginUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
