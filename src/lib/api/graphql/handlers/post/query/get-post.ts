// src/lib/api/graphql/handlers/post/query/get-post.ts

import { displayErrMessageWhenDev } from "@/lib/helpers/error-helpers";
import {
  requiredAuthentication,
  requiredClassroomMember,
} from "@/lib/helpers/security-helpers";
import { isEmpty, isMongoId, trim } from "validator";
import { GraphQLContext } from "@/lib/api/graphql/core/context";

const formatGraphQLErrorMessage = (message: string) => ({
  post: null,
  err: {
    name: "getPost",
    message,
  },
});

/** ==================================================================================
 * @name getPost()
 * @type resolver
 * @desc Return a post corresponding to a given post ID
 * @param parent : default parameter from ApolloServer
 * @param { _id } [GRAPHQL_ARGS] : post ID
 * @param { models } [GRAPHQL_CONTEXT] : Mongoose Model
 * @return Object : GraphQL GetPostResponse Type
 ================================================================================== */
const GetPostResponse = async (_: any, { _id }: any, { models, user }: GraphQLContext) => {
  try {
    // ---------------------------------------------------------------------
    // Input Validation
    // ---------------------------------------------------------------------
    if (isEmpty(trim(_id)) || !isMongoId(_id)) {
      return formatGraphQLErrorMessage("post ID is invalid");
    }

    // ---------------------------------------------------------------------
    // Authentication
    // ---------------------------------------------------------------------
    // Make sure user has authorized access
    const isLogin = await requiredAuthentication(user);
    if (!isLogin) return formatGraphQLErrorMessage("Authentication Required");

    // ---------------------------------------------------------------------
    // If the post does not exist
    // ---------------------------------------------------------------------
    const post = await models.Post.findOne(
      { _id },
      "_id title creator recipe comments classroom isPublic createdAt updatedAt",
    )
      .populate("comments")
      .lean();

    if (!post) return formatGraphQLErrorMessage("The post does not exist");

    // ---------------------------------------------------------------------
    // Checking the current user is classroom member
    // ---------------------------------------------------------------------
    const isClassroomMember = await requiredClassroomMember(
      user,
      String(post.classroom),
    );
    if (!isClassroomMember) {
      return formatGraphQLErrorMessage("Unauthorized Access");
    }

    // ---------------------------------------------------------------------
    // Return appropriete GraphQL response
    // ---------------------------------------------------------------------
    return {
      post,
      err: null,
    };
  } catch (err) {
    displayErrMessageWhenDev(err);
    return formatGraphQLErrorMessage("Server Error");
  }
};

export default GetPostResponse