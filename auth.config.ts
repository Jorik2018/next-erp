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
      const { nextUrl } = request;

      const isLoggedIn = !!auth?.user;

      const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/admin");

      if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = nextUrl.clone();

        loginUrl.pathname = "/login";
        loginUrl.search = "";

        const destiny = `${nextUrl.pathname}${nextUrl.search}`
          .replace(/^\/+/, "");

        loginUrl.searchParams.set("destiny", destiny);

        return Response.redirect(loginUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
