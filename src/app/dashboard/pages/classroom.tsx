'use client'

import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

import ClassroomActivityPanel from '@/components/ClassroomPage/ClassroomActivityPanel'
import ClassroomHeaderPanel from '@/components/ClassroomPage/ClassroomHeaderPanel'
import ClassroomInfoPanel from '@/components/ClassroomPage/ClassroomInfoPanel'
import ClassroomPreview from '@/components/ClassroomPage/ClassroomPreview'
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import LoadingIcon from '../../core/components/LoadingIcon'
import Container from '../../core/components/Container'
import PostsList from '../../core/components/PostsList'
import Panel from '../../core/components/Panel'
import { useAppSelector } from '@/app/core/store/hooks'
import Card from '@/components/Card'


interface ClassroomCreator {
  _id: string
  fname: string
  lname?: string | null
}

interface CourseOutline {
  title: string
  passed: boolean
}

interface ClassroomPost {
  _id: string
  title: string
}

interface Classroom {
  _id: string
  name: string
  description: string
  subject: string
  thumbnail: string
  creator: ClassroomCreator
  outline: CourseOutline[]
  posts: ClassroomPost[]
}

interface ClassroomProfile {
  isMember: boolean
  didJoinReqSent: boolean
  classroom: Classroom | null
}

interface ClassroomProfileData {
  classroomProfile: ClassroomProfile | null
}

interface ClassroomProfileVariables {
  _id: string
}

interface ClassroomPageClientProps {
  id: string
}

const CLASSROOM_PROFILE_QUERY = gql`
  query ClassroomProfile($_id: String!) {
    classroomProfile(_id: $_id) {
      isMember
      didJoinReqSent

      classroom {
        _id
        name
        description
        subject
        thumbnail

        creator {
          _id
          fname
          lname
        }

        outline {
          title
          passed
        }

        posts {
          _id
          title
        }
      }

      err {
        message
      }
    }
  }
`

const ClassroomPageClient = ({
  id
}: ClassroomPageClientProps) => {
  const activeUser = useAppSelector(
    state => state.user
  )

  const {
    data,
    loading,
    error
  } = useQuery<
    ClassroomProfileData,
    ClassroomProfileVariables
  >(CLASSROOM_PROFILE_QUERY, {
    variables: {
      _id: id
    },
    skip: !id
  })

  if (loading) {
    return (
      <AuthenticatedLayout>
        <LoadingIcon />
      </AuthenticatedLayout>
    )
  }

  if (error) {
    return (
      <AuthenticatedLayout>
        <Card
          $padding="2em"
          $marginTop="5em"
          $textCenter
        >
          <h3>Unable to load classroom information.</h3>
        </Card>
      </AuthenticatedLayout>
    )
  }

  const classroomProfile = data?.classroomProfile
  const classroom = classroomProfile?.classroom

  if (!classroom) {
    return (
      <AuthenticatedLayout>
        <Card
          $padding="2em"
          $marginTop="5em"
          $textCenter
        >
          <h3>Classroom not found.</h3>
        </Card>
      </AuthenticatedLayout>
    )
  }

  return (
    <AuthenticatedLayout>
      <ClassroomHeaderPanel
        classroomID={classroom._id}
        classroomName={classroom.name}
      />

      <Container $marginTop="7em">
        {classroomProfile.isMember ? (
          <>
            <Panel $left $width={40}>
              <ClassroomInfoPanel
                thumbnail={classroom.thumbnail}
                courseOutline={classroom.outline}
              />
            </Panel>

            <Panel
              $right
              $height="850px"
              $width={60}
            >
              <PostsList
                classroomID={classroom._id}
                posts={classroom.posts}
                height="700px"
              />
            </Panel>

            <ClassroomActivityPanel
              classroomID={classroom._id}
              currentUserID={activeUser.id}
              classroomCreatorID={
                classroom.creator._id
              }
            />
          </>
        ) : (
          <ClassroomPreview
            classroomID={classroom._id}
            subject={classroom.subject}
            didJoinReqSent={
              classroomProfile.didJoinReqSent
            }
            description={classroom.description}
            instructor={[
              classroom.creator.fname,
              classroom.creator.lname
            ]
              .filter(Boolean)
              .join(' ')}
          />
        )}
      </Container>
    </AuthenticatedLayout>
  )
}

export default ClassroomPageClient