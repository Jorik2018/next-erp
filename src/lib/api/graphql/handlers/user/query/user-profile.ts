import { displayErrMessageWhenDev } from "@/lib/helpers/error-helpers";
import { requiredAuthentication } from "@/lib/helpers/security-helpers";
import { isMongoId } from "validator";
import { GraphQLContext } from "@/lib/api/graphql/core/context";

const formatGraphQLErrorMessage = (message: string) => ({
  user: null,
  err: {
    name: "user",
    message,
  },
});

interface UserProfileArgs {
  _id?: string;
}

/**
 * Returns a user profile.
 *
 * When `_id` is provided, returns that user's profile.
 * Otherwise, returns the authenticated user's profile.
 */
const userProfile = async (
  _: unknown,
  { _id }: UserProfileArgs,
  { user, models }: GraphQLContext
) => {
  try {
    console.log('userProfile',user);
    const isLogin = await requiredAuthentication(user);

    if (!isLogin || !user) {
      return formatGraphQLErrorMessage(
        "Authentication Required"
      );
    }

    const userId = _id ?? user._id?.toString();

    if (!userId || !isMongoId(userId)) {
      return formatGraphQLErrorMessage(
        "User ID invalid or not specified"
      );
    }

    const givenUser = await models.User.findOne(
      {
        _id: userId,
      },
      "_id email fname lname career address username profilePicture"
    ).lean();

    if (!givenUser) {
      return formatGraphQLErrorMessage(
        "User not found"
      );
    }

    return {
      user: givenUser,
      err: null,
    };
  } catch (err) {
    displayErrMessageWhenDev(err);

    return formatGraphQLErrorMessage(
      "Server Error"
    );
  }
};

export default userProfile;