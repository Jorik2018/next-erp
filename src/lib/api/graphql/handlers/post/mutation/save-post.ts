import { ENG_THA_NUM_ALPHA } from "@/lib/api/constants";
import { displayErrMessageWhenDev } from "@/lib/helpers/error-helpers";
import {
  requiredAuthentication,
  requiredClassroomAdmin,
} from "@/lib/helpers/security-helpers";
import { isEmpty, isMongoId, trim } from "validator";
import { GraphQLContext } from "@/lib/api/graphql/core/context";

const formatGraphQLErrorMessage = (message: string) => ({
  success: false,
  post: null,
  err: {
    name: "savePost",
    message,
  },
});

/** ==================================================================================
 * @name savePost()
 * @type resolver
 * @desc Create or update a post
 * @param parent : default parameter from ApolloServer
 * @param { postID } [GRAPHQL_ARGS] : Post ID (optional, required for update)
 * @param { title } [GRAPHQL_ARGS] : Post title
 * @param { recipe } [GRAPHQL_ARGS] : Post content(post recipe)
 * @param { isPublic } [GRAPHQL_ARGS] : Specify whether the post will be publicly visible or not
 * @param { classroomID } [GRAPHQL_ARGS] : Classroom ID
 * @param { models } [GRAPHQL_CONTEXT] : Mongoose Model
 * @param { user } [GRAPHQL_CONTEXT] : Current logged-in user(extracted from JWT token)
 * @return Object : GraphQL SavePostResponse Type
 ================================================================================== */
const SavePostResponse = async (
  _: any,
  { postID, classroomID, title, recipe, isPublic }: any,
  { models, user }: GraphQLContext,
) => {
  try {
    // ---------------------------------------------------------------------
    // Authentication
    // ---------------------------------------------------------------------
    const isLogin = await requiredAuthentication(user);

    if (!isLogin) {
      return formatGraphQLErrorMessage("Authentication Required");
    }

    // ---------------------------------------------------------------------
    // Validation
    // ---------------------------------------------------------------------
    if (
      isEmpty(trim(classroomID)) ||
      isEmpty(trim(recipe)) ||
      isEmpty(trim(title))
    ) {
      return formatGraphQLErrorMessage(
        "Important information not provided or invalid",
      );
    }

    // classroomID must be MongoDB ObjectId
    if (!isMongoId(classroomID)) {
      return formatGraphQLErrorMessage("ClassroomID invalid");
    }

    // postID is optional, but if provided it must be MongoDB ObjectId
    if (postID && !isMongoId(postID)) {
      return formatGraphQLErrorMessage("PostID invalid");
    }

    if (!ENG_THA_NUM_ALPHA.test(title)) {
      return formatGraphQLErrorMessage("Post title invalid");
    }

    // ---------------------------------------------------------------------
    // Checking the current user is classroom supervisor(creator)
    // ---------------------------------------------------------------------
    const isClassroomAdmin = await requiredClassroomAdmin(
      user,
      classroomID,
    );

    if (!isClassroomAdmin) {
      return formatGraphQLErrorMessage("Unauthorized Access");
    }

    // ---------------------------------------------------------------------
    // Checking classroom exists
    // ---------------------------------------------------------------------
    const targetClassroom = await models.Classroom.findOne(
      {
        _id: classroomID,
      },
      "_id",
    ).lean();

    if (!targetClassroom) {
      return formatGraphQLErrorMessage(
        "Given classroom does not exist",
      );
    }

    // ---------------------------------------------------------------------
    // Create or update post
    // ---------------------------------------------------------------------
    let post;

    if (postID) {
      // UPDATE
      post = await models.Post.findOneAndUpdate(
        {
          _id: postID,
          classroom: targetClassroom._id,
        },
        {
          $set: {
            title,
            recipe,
            isPublic,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!post) {
        return formatGraphQLErrorMessage(
          "Given post does not exist",
        );
      }
    } else {
      // CREATE
      post = await models.Post.create({
        title,
        recipe,
        isPublic,
        creator: user!._id,
        classroom: targetClassroom._id,
      });
    }

    // ---------------------------------------------------------------------
    // Return appropriate GraphQL response
    // ---------------------------------------------------------------------
    return {
      success: true,
      post,
      err: null,
    };
  } catch (err) {
    displayErrMessageWhenDev(err);

    return formatGraphQLErrorMessage("Server Error");
  }
};

export default SavePostResponse;