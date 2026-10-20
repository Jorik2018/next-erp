'use client'

import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'


import { CLASSROOM_PAGE } from '../core/constants/endpoints/ui'



import ClassroomInvitationModal, { hideClassroomInvitationModal, showClassroomInvitationModal } from '@/app/core/reducers/classroom-invitation-modal'
import { useAppDispatch, useAppSelector } from '@/app/core/store/hooks'
import ClassroomMemberPanel from '@/app/core/components/ClassroomMemberPage/ClassroomMemberPanel'
import Card from '@/app/core/components/Card'
import Container from '@/app/core/components/Container'
import { Button } from '@/app/core/components/Button'
import LoadingIcon from '@/app/core/components/LoadingIcon'
import AuthenticatedLayout from '@/app/core/components/Layout/AuthenticatedLayout'
import ClassroomActivityPanel from '@/app/core/core/components/ClassroomPage/ClassroomActivityPanel'

interface ClassroomMember {
  _id: string
  fname: string
  lname?: string | null
  profilePicture?: string
}

interface Classroom {
  _id: string
  name: string
}

interface ClassroomMembersResult {
  isMember: boolean
  members: ClassroomMember[]
  classroom: Classroom
  err?: {
    message: string
  } | null
}

interface ClassroomMembersData {
  classroomMembers: ClassroomMembersResult | null
}

interface ClassroomMembersVariables {
  classroomID: string
}

interface ClassroomMemberPageClientProps {
  classroomID: string
}

const CLASSROOM_MEMBERS_QUERY = gql`
  query ClassroomMembers($classroomID: String!) {
    classroomMembers(classroomID: $classroomID) {
      isMember

      members {
        _id
        fname
        lname
        profilePicture
      }

      classroom {
        _id
        name
      }

      err {
        message
      }
    }
  }
`

const ClassroomMemberPageClient = ({
  classroomID
}: ClassroomMemberPageClientProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const isClassroomInvitationModalShowing =
    useAppSelector(
      state => state.classroomInvitationModal
    )

  const {
    data,
    loading,
    error
  } = useQuery<
    ClassroomMembersData,
    ClassroomMembersVariables
  >(CLASSROOM_MEMBERS_QUERY, {
    variables: {
      classroomID
    },
    skip: !classroomID
  })

  const classroomMembers =
    data?.classroomMembers

  useEffect(() => {
    if (
      !loading &&
      classroomMembers &&
      !classroomMembers.isMember
    ) {
      router.replace(
        `${CLASSROOM_PAGE}?id=${classroomMembers.classroom._id}`
      )
    }
  }, [
    loading,
    classroomMembers,
    router
  ])

  if (loading) {
    return (
      <AuthenticatedLayout>
        <LoadingIcon />
      </AuthenticatedLayout>
    )
  }

  if (error || !classroomMembers) {
    return (
      <AuthenticatedLayout>
        <Card
          $padding="2em"
          $marginTop="5em"
          $textCenter
        >
          <h3>
            Unable to load classroom members.
          </h3>
        </Card>
      </AuthenticatedLayout>
    )
  }

  if (!classroomMembers.isMember) {
    return (
      <AuthenticatedLayout>
        <LoadingIcon />
      </AuthenticatedLayout>
    )
  }

  return (
    <AuthenticatedLayout>
      <ClassroomInvitationModal
        classroomID={classroomMembers.classroom._id}
        isShowing={
          isClassroomInvitationModalShowing
        }
        hideClassroomInvitationModal={() =>
          dispatch(hideClassroomInvitationModal())
        }
      />

      <ClassroomHeaderPanel
        classroomName={
          classroomMembers.classroom.name
        }
        classroomID={
          classroomMembers.classroom._id
        }
      />

      <Container $marginTop="7em">
        <Card
          $fluidWidth
          $textCenter
          $padding="1em"
          $marginTop="1em"
        >
          <Button
            $primary
            type="button"
            onClick={() =>
              dispatch(
                showClassroomInvitationModal()
              )
            }
          >
            Add New Member
          </Button>
        </Card>

        <ClassroomMemberPanel
          classroomMembers={
            classroomMembers.members
          }
        />

        <ClassroomActivityPanel />
      </Container>
    </AuthenticatedLayout>
  )
}

export default ClassroomMemberPageClient