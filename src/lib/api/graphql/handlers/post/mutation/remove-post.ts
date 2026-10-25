import { displayErrMessageWhenDev } from "@/lib/helpers/error-helpers";
import {
  requiredAuthentication,
  requiredClassroomAdmin,
} from "@/lib/helpers/security-helpers";
import { isEmpty, isMongoId, trim } from "validator";
import { GraphQLContext } from "@/lib/api/graphql/core/context";

const formatGraphQLErrorMessage = (message: string) => ({
  success: false,
  err: {
    name: "removePost",
    message,
  },
});

/** ==================================================================================
 * @name removePost()
 * @type resolver
 * @desc Remove an existing post
 * @param parent : default parameter from ApolloServer
 * @param { postID } [GRAPHQL_ARGS] : Post ID which about to be removed
 * @param { models } [GRAPHQL_CONTEXT] : Mongoose Model
 * @param { user } [GRAPHQL_CONTEXT] : Currnet logged-in user(extracted from JWT token)
 * @return Object : GraphQL RemovePostResponse Type
 ================================================================================== */
const RemovePostResponse = async (
  _: any,
  { postID, classroomID }: any,
  { models, user }: GraphQLContext,
) => {
  try {
    // ---------------------------------------------------------------------
    // Authentication
    // ---------------------------------------------------------------------
    // Make sure user has authorized access
    const isLogin = await requiredAuthentication(user);
    if (!isLogin) return formatGraphQLErrorMessage("Authentication Required");

    // ---------------------------------------------------------------------
    // Checking the current user is classroom supervisor(creator)
    // ---------------------------------------------------------------------
    const isClassroomAdmin = await requiredClassroomAdmin(user, classroomID);
    if (!isClassroomAdmin) {
      return formatGraphQLErrorMessage("Unauthorized Access");
    }

    // ---------------------------------------------------------------------
    // Input Validation
    // ---------------------------------------------------------------------
    if (isEmpty(trim(postID)) || !isMongoId(postID)) {
      return formatGraphQLErrorMessage("post ID is empty or invalid");
    }

    // ---------------------------------------------------------------------
    // Making sure a given post does exist
    // ---------------------------------------------------------------------
    const postToRemove = await models.Post.findOne({ _id: postID }).lean();
    if (!postToRemove) {
      return formatGraphQLErrorMessage(
        "A post with the given ID does not exist",
      );
    }

    // ---------------------------------------------------------------------
    // Remove the post
    // ---------------------------------------------------------------------
    await models.Post.deleteOne({ _id: postID });

    // ---------------------------------------------------------------------
    // return appropriete graphql response
    // ---------------------------------------------------------------------
    return {
      success: true,
      err: null,
    };
  } catch (err) {
    displayErrMessageWhenDev(err);
    return formatGraphQLErrorMessage("Server Error");
  }
};

export default RemovePostResponse