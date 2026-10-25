export const subCommentsTypeDefs = `#graphql
    type SubComment {
        _id: String!
        creator: User!
        message: String!
        parentComment: Comment!
    }
`
