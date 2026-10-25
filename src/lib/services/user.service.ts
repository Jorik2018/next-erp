
import { connectMongoDB } from "@/lib/db/mongodb";
import { UserModel } from "@/lib/api/models";
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

export async function findMongoUserIdByAuthUserId(
  authUserId: string
): Promise<string | undefined> {
  await connectMongoDB();

  const mongoUser = await UserModel.findOne({
    authUserId,
  })
    .select("_id")
    .lean();

  return mongoUser?._id.toString();
}