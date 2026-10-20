
import { connectMongoDB } from "@/api/db/mongodb";
import { UserModel } from "../models";

interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
}

export async function getOrCreateMongoUser(
  authUser: AuthUser,
) {
  await connectMongoDB();

  if (!authUser.id) {
    throw new Error("Authenticated user ID is required");
  }

  const mongoUser = await UserModel.findOneAndUpdate(
    {
      authUserId: authUser.id,
    },
    {
      $setOnInsert: {
        authUserId: authUser.id,
        name: authUser.name ?? "User",
        email: authUser.email ?? "",
        fname: authUser.name ?? "User",
        lname: "lname",
        username: authUser.email?.split("@")[0] ??
          `user-${authUser.id}`,
      },
    },
    {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );

  return mongoUser;
}
