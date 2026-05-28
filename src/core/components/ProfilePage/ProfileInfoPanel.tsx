'use client'

import styled from 'styled-components'

import Card from '../Card'

const Seperator = styled.div`
  width: 40%;
  height: 2px;

  margin: 1em auto;

  background-color: ${p =>
    p.theme?.PRIMARY_COLOR ?? '#0070f3'};
`

const UserInfoItem = styled.h4`
  color: #777;
  font-size: 1.1em;
  font-weight: 400;
  margin-bottom: 0.3em;
`

const UserFullName = styled.h1`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  font-weight: 400;
`

const ProfileInfoDetails = styled.div`
  margin-bottom: 2em;
`

const ProfileInfoContainer = styled.div`
  padding: 3.5em 2em;
  text-align: center;
`

const ProfileInfoPanelCard = styled(Card)`
  margin: 1.5em auto 0 auto;

  max-width: 480px;

  padding-top: 4em;

  height: 650px;
`

const ProfileImage = styled.img`
  display: block;

  width: 250px;
  height: 250px;

  margin: 0 auto;

  border: none;
  border-radius: 50%;
`

type ProfileInfoPanelProps = {
  email?: string
  career?: string
  address?: string
  realName?: string
  username?: string
  profilePicture?: string
}

export default function ProfileInfoPanel({
  email,
  career,
  address,
  realName,
  username,
  profilePicture,
}: ProfileInfoPanelProps) {
  return (
    <ProfileInfoPanelCard>
      <ProfileImage
        src={profilePicture ?? ''}
        alt={realName ?? 'Profile'}
      />

      <ProfileInfoContainer>
        <ProfileInfoDetails>
          <UserFullName>
            {realName ?? 'ไม่ได้กำหนด'}
          </UserFullName>

          <Seperator />

          <UserInfoItem>
            ชื่อผู้ใช้ : {username || 'ไม่ได้กำหนด'}
          </UserInfoItem>

          <UserInfoItem>
            อีเมลล์ : {email || 'ไม่ได้กำหนด'}
          </UserInfoItem>

          <UserInfoItem>
            ที่อยู่ : {address || 'ไม่ได้กำหนด'}
          </UserInfoItem>

          <UserInfoItem>
            อาชีพ : {career || 'ไม่ได้กำหนด'}
          </UserInfoItem>
        </ProfileInfoDetails>
      </ProfileInfoContainer>
    </ProfileInfoPanelCard>
  )
}