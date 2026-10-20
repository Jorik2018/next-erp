import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { graphqlServer } from "./server";
import type { GraphQLContext } from "./core/context";
import models from '@/api/models'

export const handler = startServerAndCreateNextHandler<
  NextRequest,
  GraphQLContext
>(graphqlServer, {
  context: async () => {
    const session = await auth();
    return {
      currentUser: session?.user?.id
        ? {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
        }
        : null,
        models
    };
  },
});
