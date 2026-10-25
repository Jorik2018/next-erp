import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { graphqlServer } from "./server";
import type { GraphQLContext } from "./core/context";
import models from "@/lib/api/models";
import { ObjectId } from "mongodb";
import { connectMongoDB } from "../../db/mongodb";

export const handler = startServerAndCreateNextHandler<
  NextRequest,
  GraphQLContext
>(graphqlServer, {
  context: async () => {
    await connectMongoDB();
    const session = await auth();
    return {
      user: session?.user?.id
        ? {
          id: session.user.id,
          _id: session.user._id ? new ObjectId(session.user._id) : undefined,
          name: session.user.name,
          email: session.user.email,
        }
        : undefined,
      models,
    };
  },
});
