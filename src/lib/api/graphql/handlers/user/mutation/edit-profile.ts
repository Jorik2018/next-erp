import { requiredAuthentication } from "@/lib/helpers/security-helpers";
import { GraphQLContext } from "@/lib/api/graphql/core/context";

/** ==================================================================================
 * @name editProfile()
 * @type resolver
 * @desc Edit user's profile information
 * @param parent : default parameter from ApolloServer
 * @param { username } [GRAPHQL_ARGS] : New username
 * @param { fname } [GRAPHQL_ARGS] : User new firstname
 * @param { lname } [GRAPHQL_ARGS] : User new lastname
 * @param { career } [GRAPHQL_ARGS] : User new career
 * @param { address } [GRAPHQL_ARGS] : User new address
 * @param { user } [GRAPHQL_CONTEXT] : Current authenticated user
 * @param { models } [GRAPHQL_CONTEXT] : Mongoose Model
 * @return GraphQL EditProfileResponse Type
 ================================================================================== */
const EditProfileResponse = async (_: any, user: any, { models }: GraphQLContext) => {
  try {
    // Authentication : user must be logged-in
    await requiredAuthentication(user);
  } catch (err) {}
};

export default EditProfileResponse