'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Card from '../Card'
import { showErrorAlert } from '@/lib/slices/error-alert'
import { hideLoadingModal, showLoadingModal } from '@/lib/slices/mutation-status'
import { Button } from '@/lib/ui/button'

const ClassroomPreviewWrapper = styled(Card)`
  text-align: center;
  max-width: 800px;
  margin-top: 1.5em;
  margin-bottom: 3em;
  padding: 4em 3em;
`

const PrimaryInfoItem = styled.div`
  margin-bottom: 2em;
`

const Topic = styled.h2`
  font-weight: 400;
  color: ${({ theme }) => theme.PRIMARY_COLOR};
  font-size: 1.6em;
`

const Info = styled.h1`
  color: #777;
  font-size: 1.8em;
  font-weight: 400;
`

interface ClassroomInfoItemProps {
  topic: string
  info: string
}

const ClassroomInfoItem = ({
  topic,
  info
}: ClassroomInfoItemProps) => (
  <PrimaryInfoItem>
    <Topic>{topic}</Topic>
    <Info>{info}</Info>
  </PrimaryInfoItem>
)

interface ClassroomPreviewProps {
  classroomID: string
  subject: string
  instructor: string
  description: string
  didJoinReqSent: boolean
}

interface SendJoinRequestData {
  sendClassroomJoinRequest: {
    success: boolean
    err?: {
      message: string
    } | null
  }
}

interface SendJoinRequestVariables {
  classroomID: string
}

const SEND_CLASSROOM_JOIN_REQUEST = gql`
  mutation SendClassroomJoinRequest($classroomID: String!) {
    sendClassroomJoinRequest(classroomID: $classroomID) {
      success
      err {
        message
      }
    }
  }
`

/**
 * @name ClassroomPreview
 * @desc Displays classroom information to users who are not members.
 */
const ClassroomPreview = ({
  subject,
  instructor,
  description,
  classroomID,
  didJoinReqSent
}: ClassroomPreviewProps) => {
  const dispatch = useDispatch()

  const [sendJoinRequest] = useMutation<
    SendJoinRequestData,
    SendJoinRequestVariables
  >(SEND_CLASSROOM_JOIN_REQUEST)

  const sendClassroomJoinRequest = async () => {
    dispatch(showLoadingModal())

    try {
      const { data } = await sendJoinRequest({
        variables: {
          classroomID
        }
      })

      const result = data?.sendClassroomJoinRequest

      if (!result?.success) {
        dispatch(
          showErrorAlert(
            result?.err?.message ??
            'Unable to send the classroom join request.'
          )
        )

        return
      }

      alert('Request sent successfully.')
    } catch (error) {
      console.error(
        'Unable to send classroom join request:',
        error
      )

      dispatch(
        showErrorAlert(
          'Unable to process your request at this time.'
        )
      )
    } finally {
      dispatch(hideLoadingModal())
    }
  }

  return (
    <ClassroomPreviewWrapper>
      <ClassroomInfoItem
        topic="Subject"
        info={subject}
      />

      <ClassroomInfoItem
        topic="Instructor"
        info={instructor}
      />

      <ClassroomInfoItem
        topic="Description"
        info={description}
      />

      {!didJoinReqSent ? (
        <Button
          type="button"
          onClick={sendClassroomJoinRequest}
        >
          Request to Join Classroom
        </Button>
      ) : (
        <h4>
          You have already sent a request to join this classroom.
          Please wait for the classroom administrator to respond.
        </h4>
      )}
    </ClassroomPreviewWrapper>
  )
}

export default ClassroomPreview