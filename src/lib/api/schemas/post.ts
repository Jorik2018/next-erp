// src/lib/api/schemas/post.ts

export const postTypeDefs = `#graphql

    type Post {
        _id: String!
        title: String!
        creator: User!
        classroom: String!
        recipe: String!
        comments: [Comment]!
        isPublic: Boolean!
        createdAt: String
        updatedAt: String
    }

    type ClassroomPostsResponse {
        posts: [Post]
        err: Error
    }

    type SavePostResponse {
        success: Boolean!
        post: Post
        err: Error
    }

    type GetPostResponse {
        post: Post
        err: Error
    }

    type RemovePostResponse {
        success: Boolean!
        err: Error
    }

    type Query {
        getPost(_id: String!): GetPostResponse!
        classroomPosts(_id: String!): ClassroomPostsResponse!
    }

    type Mutation {
        savePost(
            postID: String
            classroomID: String
            title: String!
            recipe: String!
            isPublic: Boolean!
        ): SavePostResponse!

        removePost(
            postID: String!
        ): RemovePostResponse!
    }

`