// src/lib/api/graphql/core
import type { Types } from "mongoose";
import models from "@/lib/api/models";

export interface CurrentUser {
  id: string;
  name?: string | null;
  email?: string | null;
  _id?: Types.ObjectId;
}

export interface GraphQLContext {
  user?: CurrentUser;
  models: typeof models;
}

export function requireUser(context: GraphQLContext): CurrentUser {
  if (!context.user?.id) {
    throw new Error("Unauthorized");
  }

  return context.user;
}