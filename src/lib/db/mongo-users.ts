import { UserModel } from "@/api/models";

export async function findMongoUserIdByAuthUserId(
  authUserId: string
): Promise<string | undefined> {
  const mongoUser = await UserModel.findOne({
    authUserId,
  })
    .select("_id")
    .lean();

  return mongoUser?._id.toString();
}