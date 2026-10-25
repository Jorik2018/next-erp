export const classroomTypeDefs = `#graphql
  type Classroom {
    id: ID!
    name: String!
    description: String
    subject: String
    thumbnail: String
    creatorId: ID!
  }

  type UserClassroomsResponse {
    classrooms: [Classroom!]!
    err: Error
  }

  type CreateClassroomResponse {
    success: Boolean!
    classroomID: ID
    err: Error
  }

  type ClassroomInvitation {
    classroomName: String!
    classroomID: ID!
    thumbnail: String
    issueDate: String
  }

  type ClassroomInvitationsResult {
    invitations: [ClassroomInvitation!]!
    err: Error
  }

  type Query {
    myClassrooms: [Classroom!]!
    userClassrooms(id: ID!): UserClassroomsResponse!
    classroom(id: ID!): Classroom
    myClassroomInvitations: ClassroomInvitationsResult!
  }

  type Mutation {
    createClassroom(
      name: String!
      description: String!
      subject: String!
    ): CreateClassroomResponse!
  }
`