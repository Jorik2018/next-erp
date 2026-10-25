export const commentTypeDefs = `#graphql
    type Comment {
        _id: String!
        creator: User!
	    message: String!
	    parentPost: Post!
        subComments: [SubComment]!
    }
`
