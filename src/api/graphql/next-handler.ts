import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { graphqlServer } from "./server";
import type { GraphQLContext } from "./core/context";
import models from "@/api/models";
import { ObjectId } from "mongodb";

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
          _id: session.user._id ? new ObjectId(session.user._id) : undefined,
          name: session.user.name,
          email: session.user.email,
        }
        : null,
      models,
    };
  },
});
