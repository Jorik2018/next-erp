export const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    username: String
    career: String
    address: String
    profilePicture: String
  }

  type UserProfileResponse {
    user: User
    err: Error
  }

  type Query {
    myProfile: User
    userProfile(id: ID!): UserProfileResponse!
  }

  type Mutation {
    editMyProfile(
      name: String
      username: String
      career: String
      address: String
      profilePicture: String
    ): UserProfileResponse!
  }
`
