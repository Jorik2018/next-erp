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
    authorized({ auth, request: { nextUrl ,url,headers} }) {

        console.log("REQUEST URL:", url);
  console.log("NEXT URL:", nextUrl.href);
  console.log("ORIGIN:", nextUrl.origin);

  console.log(
    "HOST:",
    headers.get("host"),
  );

  console.log(
    "FORWARDED HOST:",
    headers.get("x-forwarded-host"),
  );


      const isLoggedIn = !!auth?.user;

      const isProtectedRoute =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/admin");

      return isProtectedRoute ? isLoggedIn : true;
    },
  },
} satisfies NextAuthConfig;