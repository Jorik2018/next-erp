'use client'

import { gql } from '@apollo/client'
import styled from 'styled-components'
import { useQuery } from '@apollo/client/react'
import { useDispatch } from 'react-redux'

import ClassroomInvitationItem from './ClassroomInvitationItem'
import Card, { Header, Body, Footer } from '../Card'
import LoadingIcon from '../LoadingIcon'

import {
  hideLoadingModal,
  showLoadingModal
} from '@/lib/slices/mutation-status'

import { showErrorAlert } from '@/lib/slices/error-alert'
import { Button } from '@/lib/ui/button'

const ClassroomInvitationPanelCard = styled(Card)`
  height: 650px;
  margin: 0 auto;
  max-width: 100%;
  padding-bottom: 2em;
`

interface ClassroomInvitation {
  classroomName: string
  classroomID: string
  thumbnail?: string
  issueDate?: string
}

interface UserClassroomInvitationsData {
  userClassroomInvitations: {
    invitations: ClassroomInvitation[]
    err?: {
      message?: string | null
    } | null
  } | null
}

interface UserClassroomInvitationsVariables {
  _id: string
}

interface ClassroomInvitationsPanelProps {
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

const ClassroomInvitationsPanel = ({
  userID
}: ClassroomInvitationsPanelProps) => {
  const dispatch = useDispatch()

  const { data, loading, error } = useQuery<
    UserClassroomInvitationsData,
    UserClassroomInvitationsVariables
  >(USER_CLASSROOM_INVITATIONS_QUERY, {
    variables: {
      _id: userID
    },
    skip: !userID
  })

  const invitations =
    data?.userClassroomInvitations?.invitations ?? []

  const handleShowError = (message: string) => {
    dispatch(showErrorAlert(message))
  }

  const handleShowLoading = () => {
    dispatch(showLoadingModal())
  }

  const handleHideLoading = () => {
    dispatch(hideLoadingModal())
  }

  if (error) {
    return (
      <ClassroomInvitationPanelCard>
        <Header>Classroom Invitations</Header>

        <Body
          $overflowY="auto"
          $height="520px"
          style={{
            textAlign: 'center',
            background: '#efefef'
          }}
        >
          <Card
            $padding="2em 4em"
            $marginTop="10em"
            $textCenter
          >
            <h3>Unable to load classroom invitations.</h3>
          </Card>
        </Body>
      </ClassroomInvitationPanelCard>
    )
  }

  return (
    <ClassroomInvitationPanelCard>
      <Header>Classroom Invitations</Header>

      <Body
        $overflowY="auto"
        $height="520px"
        style={{
          textAlign: 'center',
          background: '#efefef'
        }}
      >
        {loading ? (
          <LoadingIcon />
        ) : invitations.length === 0 ? (
          <Card
            $padding="2em 4em"
            $marginTop="10em"
            $textCenter
          >
            <h3>You haven&apos;t received any classroom invitations yet.</h3>
          </Card>
        ) : (
          invitations.map((invitation) => (
            <ClassroomInvitationItem
              key={invitation.classroomID}
              name={invitation.classroomName}
              thumbnail={invitation.thumbnail}
              classroomID={invitation.classroomID}
              showErrorAlert={handleShowError}
              showLoadingModal={handleShowLoading}
              hideLoadingModal={handleHideLoading}
            />
          ))
        )}
      </Body>

      <Footer>
        <Button>
          Accept All
        </Button>

        <Button>
          Reject All
        </Button>
      </Footer>
    </ClassroomInvitationPanelCard>
  )
}

export default ClassroomInvitationsPanel