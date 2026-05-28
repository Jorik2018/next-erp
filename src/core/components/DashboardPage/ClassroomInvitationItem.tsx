'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import styled from 'styled-components'

import { CLASSROOM_PAGE } from '../../constants/endpoints/ui'
import { Button } from '../Button'
import Card from '../Card'

const ClassroomInvitationItemWrapper = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
  margin: 1em 1.5em;
  cursor: pointer;
  padding: 0;
`

const ClassroomInvitationItemCard = styled(Card)`
  transition: all 200ms ease-in;
  margin-bottom: 1em;
  max-width: 650px;
  box-shadow: none;
  margin-left: 0;
  padding: 4em;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const ClassroomInvitationItemLabel = styled.div`
  width: 470px;

  h3 {
    color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
    margin-bottom: 1em;
    font-weight: 400;
    font-size: 1.3em;
  }

  p {
    font-weight: 300;
    font-size: 1.1em;
    color: #777;
    margin: 0;
  }
`

const ClassroomInvitationProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  margin-top: -7.5em;
  margin-left: 25em;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`

type RespondToClassroomInvitationData = {
  respondToClassroomInvitation: {
    success: boolean
    err?: {
      message?: string
    }
  }
}

type RespondToClassroomInvitationVariables = {
  classroomID: string
  answer: 'accept' | 'refuse'
}

type ClassroomInvitationItemProps = {
  showLoadingModal: () => void
  hideLoadingModal: () => void
  showErrorAlert: (message: string) => void
  classroomID: string
  thumbnail?: string
  name: string
}

const RESPONSE_TO_CLASSROOM_INVITATION_MUTATION = gql`
  mutation respondToClassroomInvitation($classroomID: String!, $answer: String!) {
    respondToClassroomInvitation(classroomID: $classroomID, answer: $answer) {
      success
      err {
        message
      }
    }
  }
`

export default function ClassroomInvitationItem({
  showLoadingModal,
  hideLoadingModal,
  showErrorAlert,
  classroomID,
  thumbnail,
  name,
}: ClassroomInvitationItemProps) {
  const router = useRouter()

  const [respondToClassroomInvitation] = useMutation<
    RespondToClassroomInvitationData,
    RespondToClassroomInvitationVariables
  >(RESPONSE_TO_CLASSROOM_INVITATION_MUTATION)

  const classroomHref = `${CLASSROOM_PAGE}?id=${classroomID}`

  const submitAnswer = async (answer: 'accept' | 'refuse') => {
    try {
      showLoadingModal()

      const result = await respondToClassroomInvitation({
        variables: {
          classroomID,
          answer,
        },
      })

      const response = result.data?.respondToClassroomInvitation

      if (response?.success) {
        hideLoadingModal()

        if (answer === 'accept') {
          router.push(classroomHref)
        }

        return
      }

      hideLoadingModal()
      showErrorAlert(response?.err?.message ?? 'ไม่สามารถดำเนินการได้ในขณะนี้')
    } catch {
      hideLoadingModal()
      showErrorAlert('ไม่สามารถดำเนินการได้ในขณะนี้')
    }
  }

  return (
    <ClassroomInvitationItemWrapper>
      <ClassroomInvitationItemCard>
        <ClassroomInvitationItemLabel>
          <Link href={classroomHref}>
            <h3>{name}</h3>
          </Link>

          <Button $primary onClick={() => submitAnswer('accept')}>
            ยอมรับ
          </Button>

          <Button
            $light
            $marginLeft="1em"
            onClick={() => submitAnswer('refuse')}
          >
            ปฏิเศษ
          </Button>
        </ClassroomInvitationItemLabel>

        <Link href={classroomHref}>
          <ClassroomInvitationProfilePicture src={thumbnail} alt={name} />
        </Link>
      </ClassroomInvitationItemCard>
    </ClassroomInvitationItemWrapper>
  )
}