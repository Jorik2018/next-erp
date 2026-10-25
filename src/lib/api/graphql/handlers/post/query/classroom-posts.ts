import { displayErrMessageWhenDev } from "@/lib/helpers/error-helpers";
import {
  requiredAuthentication,
  requiredClassroomAdmin,
} from "@/lib/helpers/security-helpers";
import { isEmpty, isMongoId, trim } from "validator";
import { GraphQLContext } from "@/lib/api/graphql/core/context";

const formatGraphQLErrorMessage = (message: string) => ({
  posts: null,
  err: {
    name: "classroomsPosts",
    message,
  },
});

/** ==================================================================================
 * @name classroomPosts()
 * @type resolver
 * @desc Return a list of post corresponding to a given classroom ID
 * @param parent : default parameter from ApolloServer
 * @param { _id } [GRAPHQL_ARGS] : Classroom ID
 * @param { models } [GRAPHQL_CONTEXT] : Mongoose Model
 * @return Object : GraphQL ClassroomPostsResponse Type
 ================================================================================== */
const ClassroomPostsResponse = async (_: any, { _id }: any, { models, user }: GraphQLContext) => {
  try {
    // ---------------------------------------------------------------------
    // Authentication
    // ---------------------------------------------------------------------
    // Make sure user has authorized access
    const isLogin = await requiredAuthentication(user);
    if (!isLogin) return formatGraphQLErrorMessage("Authentication Required");

    // ---------------------------------------------------------------------
    // Checking the current user is classroom member
    // ---------------------------------------------------------------------
    const isClassroomMember = await requiredClassroomAdmin(user, _id);
    if (!isClassroomMember) {
      return formatGraphQLErrorMessage("Unauthorized Access");
    }

    // ---------------------------------------------------------------------
    // Input Validation
    // ---------------------------------------------------------------------
    if (isEmpty(trim(_id)) || !isMongoId(_id)) {
      return formatGraphQLErrorMessage("Classroom ID is invalid");
    }

    // ---------------------------------------------------------------------
    // Check classroom must be exists!
    // ---------------------------------------------------------------------
    const classroom = await models.Classroom.findOne({ _id }).lean();
    if (!classroom) {
      return formatGraphQLErrorMessage("A given classroom does not exists");
    }

    // ---------------------------------------------------------------------
    // Querying all post in the classroom
    // ---------------------------------------------------------------------
    const posts = await models.Post.find({ classroom: _id }).lean();

    // ---------------------------------------------------------------------
    // Return appropriete GraphQL response
    // ---------------------------------------------------------------------
    return {
      posts,
      err: null,
    };
  } catch (err) {
    displayErrMessageWhenDev(err);
    return formatGraphQLErrorMessage("Server Error");
  }
};

export default ClassroomPostsResponse;