'use client'

import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { showLoadingModal, hideLoadingModal } from '../../reducers/mutation-status'
import { showErrorAlert } from '../../reducers/error-alert'

import ClassroomInvitationItem from './ClassroomInvitationItem'
import Card, { Header, Body, Footer } from '../Card'
import LoadingIcon from '../LoadingIcon'
import { Button } from '../Button'

const ClassroomInvitationPanelCard = styled(Card)`
  height: 650px;
  margin: 0 auto;
  max-width: 100%;
  padding-bottom: 2em;
`

type Invitation = {
  classroomName: string
  classroomID: string
  thumbnail?: string
  issueDate?: string
}

type UserClassroomInvitationsData = {
  userClassroomInvitations?: {
    invitations?: Invitation[]
    err?: {
      message?: string
    }
  }
}

type UserClassroomInvitationsVariables = {
  _id: string
}

type ClassroomInvitationsPanelProps = {
  userID: string
}

const USER_CLASSROOM_INVITATIONS_QUERY = gql`
  query userClassroomInvitations($_id: String!) {
    userClassroomInvitations(_id: $_id) {
      invitations {
        classroomName
        classroomID
        thumbnail
        issueDate
      }
      err {
        message
      }
    }
  }
`

export default function ClassroomInvitationsPanel({
  userID,
}: ClassroomInvitationsPanelProps) {
  const dispatch = useDispatch()

  const { data, loading, error } = useQuery<
    UserClassroomInvitationsData,
    UserClassroomInvitationsVariables
  >(USER_CLASSROOM_INVITATIONS_QUERY, {
    variables: { _id: userID },
  })

  const invitations = data?.userClassroomInvitations?.invitations ?? []

  const errorMessage =
    error?.message ?? data?.userClassroomInvitations?.err?.message

  return (
    <ClassroomInvitationPanelCard>
      <Header>คำเชิญเข้าร่วมห้องเรียน</Header>

      <Body
        $overflowY="auto"
        $height="520px"
        style={{ textAlign: 'center', background: '#efefef' }}
      >
        {loading ? (
          <LoadingIcon />
        ) : errorMessage ? (
          <Card $padding="2em 4em" $marginTop="10em" $textCenter>
            <h3>{errorMessage}</h3>
          </Card>
        ) : invitations.length < 1 ? (
          <Card $padding="2em 4em" $marginTop="10em" $textCenter>
            <h3>คุณยังไม่ได้รับคำเชิญเข้าร่วมห้องเรียนใดๆ</h3>
          </Card>
        ) : (
          invitations.map(invitation => (
            <ClassroomInvitationItem
              key={invitation.classroomID}
              name={invitation.classroomName}
              thumbnail={invitation.thumbnail}
              classroomID={invitation.classroomID}
              showErrorAlert={(message: string) =>
                dispatch(showErrorAlert(message))
              }
              showLoadingModal={() => dispatch(showLoadingModal())}
              hideLoadingModal={() => dispatch(hideLoadingModal())}
            />
          ))
        )}
      </Body>

      <Footer>
        <Button $primary>ยอมรับทุกคำขอ</Button>

        <Button $light $marginLeft="1em">
          ปฏิเศษทุกคำขอ
        </Button>
      </Footer>
    </ClassroomInvitationPanelCard>
  )
}