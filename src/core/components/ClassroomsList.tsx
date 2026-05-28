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
  padding: 0 2em 0 4em;
  cursor: pointer;
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

type ClassroomsListWrapperProps = {
  $height?: string
}

const ClassroomsListWrapper = styled.div<ClassroomsListWrapperProps>`
  height: ${p => p.$height ?? '600px'};
  margin-top: 1.5em;
  overflow-y: auto;
`

type Classroom = {
  _id: string
  name: string
  description?: string
  thumbnail?: string
}

type UserClassroomsData = {
  userClassrooms?: {
    classrooms?: Classroom[]
    err?: {
      message?: string
    }
  }
}

type UserClassroomsVariables = {
  _id: string
}

type ClassroomListItemProps = Classroom

export function ClassroomListItem({
  _id,
  name,
  description,
  thumbnail,
}: ClassroomListItemProps) {
  return (
    <Link href={{ pathname: CLASSROOM_PAGE, query: { id: _id } }}>
      <ClassroomListItemWrapper>
        <ClassroomListItemCard>
          <ClassroomListItemLabel>
            <h3>{name}</h3>
            <p>{description}</p>
          </ClassroomListItemLabel>

          <ClassroomProfilePic $src={thumbnail} />
        </ClassroomListItemCard>
      </ClassroomListItemWrapper>
    </Link>
  )
}

type ClassroomsListProps = {
  _id: string
  height?: string
}

const USER_CLASSROOMS_QUERY = gql`
  query userClassrooms($_id: String!) {
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

export default function ClassroomsList({ _id, height }: ClassroomsListProps) {
  const { data, loading, error } = useQuery<
    UserClassroomsData,
    UserClassroomsVariables
  >(USER_CLASSROOMS_QUERY, {
    variables: { _id },
  })

  if (loading) {
    return <LoadingIcon />
  }

  if (error || data?.userClassrooms?.err) {
    return (
      <Card $padding="2em 4em" $marginTop="3em" $textCenter>
        <h3>ไม่สามารถโหลดข้อมูลห้องเรียนได้</h3>
      </Card>
    )
  }

  const classrooms = data?.userClassrooms?.classrooms ?? []

  return (
    <ClassroomsListWrapper $height={height}>
      {!classrooms.length ? (
        <Card $padding="2em 4em" $marginTop="3em" $textCenter>
          <h3>คุณยังไม่ได้สร้าง หรือเข้าร่วมห้องเรียนใดๆ</h3>
        </Card>
      ) : (
        classrooms.map((classroom:any)=> (
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