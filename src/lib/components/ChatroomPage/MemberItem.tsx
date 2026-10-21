import styled from 'styled-components'

import Card from '../Card'

const UserConnectionStatusCard = styled(Card)`
  box-shadow: none;
  padding: 1em 1em 1.8em;
`

interface UserConnectionStatusPicProps {
  $status: boolean
}

const UserConnectionStatusPic = styled.img<UserConnectionStatusPicProps>`
  display: inline-block;
  float: left;
  width: 60px;
  height: 60px;

  border: ${({ $status }) =>
    $status ? '2px solid #4db6ac' : 'none'};

  border-radius: 50%;
  background-color: #ccc;
  margin-right: 1.5em;
`

const Username = styled.h4`
  color: ${({ theme }) => theme.PRIMARY_COLOR};
  font-weight: 500;
  font-size: 1.1em;
  margin-bottom: 0;
`

const OfflineText = styled.p`
  margin: 0;
  color: #777;
`

const OnlineText = styled.p`
  margin: 0;
  color: #4db6ac;
`

interface MemberItemProps {
  username: string
  isOnline: boolean
}

/**
 * @name MemberItem
 * @desc Displays a classroom member and their online status
 */
const MemberItem = ({
  username,
  isOnline
}: MemberItemProps) => (
  <UserConnectionStatusCard>
    <UserConnectionStatusPic
      $status={isOnline}
      alt=""
    />

    <div>
      <Username>{username}</Username>

      {isOnline ? (
        <OnlineText>กำลังใช้งานอยู่</OnlineText>
      ) : (
        <OfflineText>ออฟไลน์</OfflineText>
      )}
    </div>
  </UserConnectionStatusCard>
)

export default MemberItem