import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isProtectedRoute =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/admin');

      if (isProtectedRoute) {
        return isLoggedIn;
      }

      if (isLoggedIn) {
        return Response.redirect(
          new URL('/dashboard', nextUrl)
        );
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;