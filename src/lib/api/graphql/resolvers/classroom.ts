import createClassroom from '../handlers/classroom/mutation/create-classroom'
import classroomMembers from '../handlers/classroom/query/classroom-members'
import classroomProfile from '../handlers/classroom/query/classroom-profile'
import userClassrooms from '../handlers/classroom/query/user-classrooms'
import inviteUser from '../handlers/classroom/mutation/invite-user'

const classroom = {
  Query: {
    classroomProfile,
    classroomMembers,
    userClassrooms
  },
  Mutation: {
    createClassroom,
    inviteUser
  }
}

export default classroom;