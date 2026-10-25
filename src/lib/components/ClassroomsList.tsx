'use client'

import Link from 'next/link'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import styled from 'styled-components'

import { CLASSROOM_PAGE } from '../constants/endpoints/ui'
import ClassroomProfilePic from './ClassroomProfilePic'
import LoadingIcon from './LoadingIcon'
import Card from './Card'

const ClassroomListItemWrapper = styled.div`
  position: relative;
  text-align: center;
  padding-right: 2em;
  padding-bottom: 0;
  padding-left: 4em;
  cursor: pointer;
  padding-top: 0;
`

const ClassroomListItemCard = styled(Card)`
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

const ClassroomListItemLabel = styled.div`
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

interface ClassroomsListWrapperProps {
  $height?: string
}

const ClassroomsListWrapper = styled.div<ClassroomsListWrapperProps>`
  height: ${({ $height }) => $height || '600px'};
  margin-top: 1.5em;
  overflow-y: auto;
`

interface Classroom {
  _id: string
  name: string
  thumbnail?: string
  description?: string
}

interface ClassroomListItemProps {
  _id: string
  name: string
  thumbnail?: string
  description?: string
}

/**
 * @name ClassroomListItem
 * @desc Displays a classroom item.
 */
export const ClassroomListItem = ({
  _id,
  name,
  description,
  thumbnail
}: ClassroomListItemProps) => (
  <Link
    href={{
      pathname: CLASSROOM_PAGE+"/"+_id
    }}
    prefetch
  >
    <ClassroomListItemWrapper>
      <ClassroomListItemCard>
        <ClassroomListItemLabel>
          <h3>{name}</h3>
          {description && <p>{description}</p>}
        </ClassroomListItemLabel>

        <ClassroomProfilePic src={thumbnail} />
      </ClassroomListItemCard>
    </ClassroomListItemWrapper>
  </Link>
)

interface UserClassroomsData {
  userClassrooms: {
    classrooms: Classroom[]
    err?: {
      message: string
    } | null
  } | null
}

interface UserClassroomsVariables {
  _id: string
}

interface ClassroomsListProps {
  _id: string
  height?: string
}

const USER_CLASSROOMS_QUERY = gql`
  query UserClassrooms($_id: String!) {
    userClassrooms(_id: $_id) {
      classrooms {
        _id
        name
        description
        thumbnail
      }
      err {
        message
      }
    }
  }
`

const ClassroomsList = ({
  _id,
  height
}: ClassroomsListProps) => {
  const { data, loading, error } = useQuery<
    UserClassroomsData,
    UserClassroomsVariables
  >(USER_CLASSROOMS_QUERY, {
    variables: { _id }
  })

  if (loading) {
    return <LoadingIcon />
  }

  if (error) {
    return (
      <Card $padding="2em 4em" $marginTop="3em" $textCenter>
        <h3>Unable to load classrooms.</h3>
      </Card>
    )
  }

  const classrooms =
    data?.userClassrooms?.classrooms ?? []

  return (
    <ClassroomsListWrapper $height={height}>
      {classrooms.length === 0 ? (
        <Card
          $padding="2em 4em"
          $marginTop="3em"
          $textCenter
        >
          <h3>
            You have not created or joined any classrooms yet.
          </h3>
        </Card>
      ) : (
        classrooms.map(classroom => (
          <ClassroomListItem
            key={classroom._id}
            _id={classroom._id}
            name={classroom.name}
            thumbnail={classroom.thumbnail}
            description={classroom.description}
          />
        ))
      )}
    </ClassroomsListWrapper>
  )
}

export default ClassroomsList