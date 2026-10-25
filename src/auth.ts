import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";

import { authConfig } from "../auth.config";
import { findUserByEmail } from "@/lib/db/users";
import { getOrCreateMongoUser } from "@/lib/services/user.service";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const {
  auth,
  signIn,
  signOut,
  handlers,
} = NextAuth(async () => {
  return {
    ...authConfig,

    trustHost: true,

    session: {
      strategy: "jwt",
    },

    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = credentialsSchema.safeParse(
            credentials,
          );

          if (!parsedCredentials.success) {
            return null;
          }

          const { email, password } = parsedCredentials.data;

          const user = await findUserByEmail(email);

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (!passwordsMatch) {
            return null;
          }

          const mongoUser = await getOrCreateMongoUser({
            id: user.id,
            name: user.name,
            email: user.email,
          });

          return {
            id: user.id,
            _id: mongoUser._id.toString(),
            name: user.name,
            email: user.email,
          };
        },
      }),
    ],

    callbacks: {
      ...authConfig.callbacks,

      async jwt({ token, user }) {
        if (user) {
          token._id = user._id;
        }

        return token;
      },

      async session({ session, token }) {
        if (session.user && token.sub) {
          session.user.id = token.sub;

          session.user._id = typeof token._id === "string"
            ? token._id
            : undefined;
        }

        return session;
      },
    },
  };
});
