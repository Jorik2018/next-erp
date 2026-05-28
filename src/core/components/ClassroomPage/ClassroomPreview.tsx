'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { showLoadingModal, hideLoadingModal } from '../../reducers/mutation-status'
import { showErrorAlert } from '../../reducers/error-alert'

import { Button } from '../Button'
import Card from '../Card'

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
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  font-size: 1.6em;
`

const Info = styled.h1`
  color: #777;
  font-size: 1.8em;
  font-weight: 400;
`

type ClassroomInfoItemProps = {
  topic: string
  info: string
}

function ClassroomInfoItem({ topic, info }: ClassroomInfoItemProps) {
  return (
    <PrimaryInfoItem>
      <Topic>{topic}</Topic>
      <Info>{info}</Info>
    </PrimaryInfoItem>
  )
}

type SendClassroomJoinRequestData = {
  sendClassroomJoinRequest: {
    success: boolean
    err?: {
      message?: string
    }
  }
}

type SendClassroomJoinRequestVariables = {
  classroomID: string
}

type ClassroomPreviewProps = {
  classroomID: string
  subject: string
  instructor: string
  description: string
  didJoinReqSent: boolean
}

const SEND_CLASSROOM_JOIN_REQUEST = gql`
  mutation sendClassroomJoinRequest($classroomID: String!) {
    sendClassroomJoinRequest(classroomID: $classroomID) {
      success
      err {
        message
      }
    }
  }
`

export default function ClassroomPreview({
  classroomID,
  subject,
  instructor,
  description,
  didJoinReqSent,
}: ClassroomPreviewProps) {
  const dispatch = useDispatch()

  const [sendJoinRequest] = useMutation<
    SendClassroomJoinRequestData,
    SendClassroomJoinRequestVariables
  >(SEND_CLASSROOM_JOIN_REQUEST)

  const sendClassroomJoinRequest = async () => {
    dispatch(showLoadingModal())

    try {
      const result = await sendJoinRequest({
        variables: {
          classroomID,
        },
      })

      const response = result.data?.sendClassroomJoinRequest

      if (response?.success) {
        alert('Done')
      } else {
        dispatch(showErrorAlert(response?.err?.message ?? 'ไม่สามารถดำเนินการได้ในขณะนี้'))
      }
    } catch {
      dispatch(showErrorAlert('ไม่สามารถดำเนินการได้ในขณะนี้'))
    } finally {
      dispatch(hideLoadingModal())
    }
  }

  return (
    <ClassroomPreviewWrapper>
      <ClassroomInfoItem topic="วิชาที่สอน" info={subject} />
      <ClassroomInfoItem topic="ผู้สอน" info={instructor} />
      <ClassroomInfoItem topic="คำอธิบาย" info={description} />

      {!didJoinReqSent ? (
        <Button $primary onClick={sendClassroomJoinRequest}>
          ส่งคำขอเข้าห้องเรียนนี้
        </Button>
      ) : (
        <h4>
          ท่านได้ทำการส่งคำขอเข้าร่วมห้องเรียนแล้ว
          กรุณารอการตอบรับจากผู้ดูแลห้องเรียน
        </h4>
      )}
    </ClassroomPreviewWrapper>
  )
}