import { connectMongoDB } from "@/api/db/mongodb";
import { UserModel } from "@/api/models"; // ajusta la ruta

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