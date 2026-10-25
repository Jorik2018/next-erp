

export const postTypeDefs = `#graphql
  type Post {
    _id: ID!
    title: String
    recipe: String
    isPublic: Boolean
    creator: ID
    classroom: ID
    comments: [Comment]
    createdAt: String
    updatedAt: String
  }

  type PostError {
    name: String
    message: String
  }

  type GetPostResponse {
    post: Post
    err: PostError
  }

  type ClassroomPostsResponse {
    posts: [Post]
    err: PostError
  }

  type SavePostResponse {
    success: Boolean!
    post: Post
    err: PostError
  }

  type RemovePostResponse {
    success: Boolean!
    err: PostError
  }

  type Query {
    getPost(
      _id: String!
    ): GetPostResponse

    classroomPosts(
      _id: String!
    ): ClassroomPostsResponse
  }

  type Mutation {
    savePost(
      postID: String
      classroomID: String
      title: String!
      recipe: String!
      isPublic: Boolean!
    ): SavePostResponse

    removePost(
      _id: String!
    ): RemovePostResponse
  }
`;