import { displayErrMessageWhenDev } from "@/api/helpers/error-helpers";
import { requiredAuthentication } from "@/api/helpers/security-helpers";
import { isMongoId } from "validator";

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

interface UserProfileContext {
  user: {
    id: string;
    _id?: string;
  } | null;

  models: {
    User: {
      findOne: (...args: any[]) => any;
    };
  };
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
  { user, models }: UserProfileContext
) => {
  try {
    const isLogin = await requiredAuthentication(user);

    if (!isLogin || !user) {
      return formatGraphQLErrorMessage(
        "Authentication Required"
      );
    }

    const userId = _id ?? user._id;

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