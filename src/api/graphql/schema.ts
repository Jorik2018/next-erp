import { classroomTypeDefs } from "../schemas/classroom";
import { commentTypeDefs } from "../schemas/comment";
import { errorTypeDefs } from "../schemas/error";
import { postTypeDefs } from "../schemas/post";
import { subCommentsTypeDefs } from "../schemas/sub-comment";
import { userTypeDefs } from "../schemas/user";

export const typeDefs = `#graphql
  type Query { health: String! }
  type Mutation { _noop: Boolean }
  ${userTypeDefs}
  ${classroomTypeDefs}
  ${commentTypeDefs}
  ${errorTypeDefs}
  ${postTypeDefs}
  ${subCommentsTypeDefs}
  ${userTypeDefs}
`;
