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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isProtectedRoute =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/admin");

      return isProtectedRoute ? isLoggedIn : true;
    },
  },
} satisfies NextAuthConfig;