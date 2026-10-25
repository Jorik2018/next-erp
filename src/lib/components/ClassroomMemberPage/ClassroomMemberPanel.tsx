import FullContainerCard from '../FullContainerCard'
import MemberItem from './MemberItem'
import UserTitle from './UserTitle'

interface ClassroomMemberPanelProps {
  classroomMembers: ClassroomMember[]
}

/**
 * @name ClassroomMemberPanel
 * @desc Displays classroom members
 */
const ClassroomMemberPanel = ({
  classroomMembers
}: ClassroomMemberPanelProps) => (
  <FullContainerCard
    header="Members"
    $marginTop="2em"
    $marginBottom="7em"
  >
    {classroomMembers.map(member => (
      <MemberItem
        key={member._id}
        profilePicture={member.profilePicture}
      >
        <UserTitle>{member.fname}</UserTitle>
      </MemberItem>
    ))}
  </FullContainerCard>
)

export default ClassroomMemberPanel