'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
//Module '"@apollo/client"' has no exported member 'useMutation'.
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import styled from 'styled-components'

import { CLASSROOM_PAGE } from '../../constants/endpoints/ui'
import Card from '../Card'
import { Button } from '@/lib/ui/button'

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
    color: ${({ theme }) => theme.PRIMARY_COLOR};
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

interface ClassroomsInvitationWrapperProps {
  $height?: string
}

export const ClassroomsInvitationWrapper =
  styled.div<ClassroomsInvitationWrapperProps>`
    height: ${({ $height }) => $height || '600px'};
    margin-top: 1.5em;
    overflow-y: auto;
  `

const ClassroomInvitationProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  margin-top: -7.5em;
  margin-left: 25em;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`

const RESPOND_TO_CLASSROOM_INVITATION_MUTATION = gql`
  mutation RespondToClassroomInvitation(
    $classroomID: String!
    $answer: String!
  ) {
    respondToClassroomInvitation(
      classroomID: $classroomID
      answer: $answer
    ) {
      success
      err {
        message
      }
    }
  }
`

type InvitationAnswer = 'accept' | 'refuse'

interface ClassroomInvitationItemProps {
  classroomID: string
  thumbnail?: string|undefined
  name: string
  showLoadingModal: () => void
  hideLoadingModal: () => void
  showErrorAlert: (message: string) => void
}

interface RespondToInvitationData {
  respondToClassroomInvitation: {
    success: boolean
    err?: {
      message: string
    } | null
  }
}

interface RespondToInvitationVariables {
  classroomID: string
  answer: InvitationAnswer
}

/**
 * @name ClassroomInvitationItem
 * @desc Displays a classroom invitation received by the current user.
 */
const ClassroomInvitationItem = ({
  classroomID,
  name,
  thumbnail,
  showLoadingModal,
  hideLoadingModal,
  showErrorAlert
}: ClassroomInvitationItemProps) => {
  const router = useRouter()

  const [respondToInvitation] = useMutation<
    RespondToInvitationData,
    RespondToInvitationVariables
  >(RESPOND_TO_CLASSROOM_INVITATION_MUTATION)

  const submitAnswer = async (
    answer: InvitationAnswer
  ) => {
    showLoadingModal()

    try {
      const { data } = await respondToInvitation({
        variables: {
          classroomID,
          answer
        }
      })

      const result = data?.respondToClassroomInvitation

      if (!result?.success) {
        showErrorAlert(
          result?.err?.message ??
            'Unable to process your request at this time.'
        )

        return
      }

      if (answer === 'accept') {
        router.push(`${CLASSROOM_PAGE}?id=${classroomID}`)
      }
    } catch {
      showErrorAlert(
        'Unable to process your request at this time.'
      )
    } finally {
      hideLoadingModal()
    }
  }

  const classroomHref = {
    pathname: CLASSROOM_PAGE,
    query: {
      id: classroomID
    }
  }

  return (
    <ClassroomInvitationItemWrapper>
      <ClassroomInvitationItemCard>
        <ClassroomInvitationItemLabel>
          <Link href={classroomHref} prefetch>
            <h3>{name}</h3>
          </Link>

          <Button
            $primary
            type="button"
            onClick={() => submitAnswer('accept')}
          >
            Accept
          </Button>

          <Button
            $light
            $marginLeft="1em"
            onClick={() => submitAnswer('refuse')}
          >
            Decline
          </Button>
        </ClassroomInvitationItemLabel>

        <Link href={classroomHref} prefetch>
          <ClassroomInvitationProfilePicture
            src={thumbnail}
            alt={`${name} classroom`}
          />
        </Link>
      </ClassroomInvitationItemCard>
    </ClassroomInvitationItemWrapper>
  )
}

export default ClassroomInvitationItem