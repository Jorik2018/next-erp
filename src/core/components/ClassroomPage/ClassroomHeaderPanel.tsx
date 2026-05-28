'use client'

import Link from 'next/link'
import styled from 'styled-components'

import { CLASSROOM_PAGE } from '../../constants/endpoints/ui'
import Card from '../Card'

const ClassroomHeaderCard = styled(Card)`
  position: absolute;
  left: 0;
  max-width: 100%;
  padding: 2em;
  text-align: center;
`

const ClassroomNameHeading = styled.h1`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  font-size: 1.7em;
  font-weight: 400;
  cursor: pointer;
`

type ClassroomHeaderPanelProps = {
  classroomID: string
  classroomName: string
}

export default function ClassroomHeaderPanel({
  classroomID,
  classroomName,
}: ClassroomHeaderPanelProps) {
  return (
    <ClassroomHeaderCard>
      ห้องเรียน

      <Link
        href={{
          pathname: CLASSROOM_PAGE,
          query: { id: classroomID },
        }}
      >
        <ClassroomNameHeading>
          {classroomName}
        </ClassroomNameHeading>
      </Link>
    </ClassroomHeaderCard>
  )
}