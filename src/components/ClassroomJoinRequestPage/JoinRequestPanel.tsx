import FullContainerCard from '../FullContainerCard'
import UserRequestItem from './UserRequestItem'
import UserTitle from './UserTitle'

/**
 * @name JoinRequestPanel
 * @desc Displays users who sent a join request to a particular classroom
 */
const JoinRequestPanel = () => (
  <FullContainerCard
    marginTop="1em"
    marginBottom="7em"
    header="คำขอเข้าร่วม"
  >
    {Array.from({ length: 8 }).map((_, index) => (
      <UserRequestItem
        key={index}
        profilePic=""
      >
        <UserTitle>Tony Stark</UserTitle>
      </UserRequestItem>
    ))}
  </FullContainerCard>
)

export default JoinRequestPanel