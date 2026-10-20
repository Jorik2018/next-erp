export const postTypeDefs = `#graphql
  type Post {
    id: ID!
    classroomId: ID!
    authorId: ID!
    title: String
    content: String
    createdAt: String!
  }

  type Query {
    classroomPosts(classroomId: ID!): [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(classroomId: ID!, title: String, content: String): Post!
    removePost(id: ID!): Boolean!
  }
`
