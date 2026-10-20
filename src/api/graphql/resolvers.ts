import classroom from "./resolvers/classroom";
import post from "./resolvers/post";
import user from "./resolvers/user";

export const resolvers = {
  Query: {
    health: () => 'ok',
    ...user.Query,
    ...classroom.Query,
    ...post.Query,
  },
  Mutation: {
    _noop: () => true,
    ...user.Mutation,
    ...classroom.Mutation,
    ...post.Mutation,
  },
}
