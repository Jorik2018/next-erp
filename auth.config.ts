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

    const isProtectedRoute =
      nextUrl.pathname.startsWith("/dashboard") ||
      nextUrl.pathname.startsWith("/admin");

    // No tocar rutas públicas: /, /login, etc.
    if (!isProtectedRoute) {
      return true;
    }

    // Ruta protegida + sesión
    if (auth?.user) {
      return true;
    }

    // Ruta protegida + sin sesión
    const loginUrl = nextUrl.clone();

    loginUrl.pathname = "/login";
    loginUrl.search = "";

    const destiny = nextUrl.pathname
      .replace(/^\/+/, "");

    loginUrl.searchParams.set("destiny", destiny);

    return Response.redirect(loginUrl);
  },
},
} satisfies NextAuthConfig;
