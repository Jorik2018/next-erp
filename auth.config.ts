//auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [],

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("AUTHORIZED AUTH:", auth);
      console.log("AUTHORIZED PATH:", nextUrl.pathname);

      const isLoggedIn = !!auth?.user;

      const isProtectedRoute =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/admin");

      return isProtectedRoute ? isLoggedIn : true;
    },
  },
} satisfies NextAuthConfig;
/*import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl, headers, url } }) {
  console.log("URL:", url);
  console.log("PATH:", nextUrl.pathname);

  console.log("Host:",
    headers.get("host"));

  console.log("X-Forwarded-Host:",
    headers.get("x-forwarded-host"));

  console.log("X-Forwarded-Proto:",
    headers.get("x-forwarded-proto"));

  console.log("X-Forwarded-Port:",
    headers.get("x-forwarded-port"));

  console.log("AUTH:", auth);

      console.log("AUTH:", auth);
      const isLoggedIn = !!auth?.user;

      const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/admin");

      if (isProtectedRoute) {
        return isLoggedIn;
      }

      if (isLoggedIn) {
        return Response.redirect(
          new URL("/dashboard", nextUrl),
        );
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;*/
