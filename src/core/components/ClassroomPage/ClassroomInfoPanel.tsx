'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

import { Button } from '../Button'
import Card from '../Card'

const ClassroomInfoPanelCard = styled(Card)`
  margin: 1.5em auto 0 auto;
  padding-top: 2.5em;
  max-width: 480px;
  height: 650px;
`

const ClassroomThumbnailImage = styled.img`
  border-radius: 50%;
  border: none;
  margin: 0 auto;
  display: block;
  height: 250px;
  width: 250px;
`

const ClassroomCourseInfoContainer = styled.div`
  padding: 3em 3em 1em 3em;
  width: 100%;
`

const ClassroomCourseInfoHeading = styled.h2`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  text-align: center;
  font-weight: 400;
`

type CourseOutlineItemProps = {
  $passed?: boolean
}

const CourseOutlineItem = styled.li<CourseOutlineItemProps>`
  font-size: 1.1em;
  font-weight: 300;
  color: ${p =>
    p.$passed ? p.theme?.PRIMARY_COLOR ?? '#0070f3' : '#777'};
`

const ClassroomPanelButtonsGroup = styled.div`
  text-align: center;
  margin: 1em auto;
`

type ClassroomInfoPanelWrapperProps = {
  children: ReactNode
  thumbnail?: string
}

function ClassroomInfoPanelWrapper({
  children,
  thumbnail,
}: ClassroomInfoPanelWrapperProps) {
  return (
    <ClassroomInfoPanelCard>
      <ClassroomThumbnailImage src={thumbnail} alt="Classroom thumbnail" />
      {children}
    </ClassroomInfoPanelCard>
  )
}

type CourseOutlineEvent = {
  title: string
  passed?: boolean
}

type ClassroomInfoPanelProps = {
  courseOutline: CourseOutlineEvent[]
  thumbnail?: string
}

export default function ClassroomInfoPanel({
  courseOutline,
  thumbnail,
}: ClassroomInfoPanelProps) {
  return (
    <ClassroomInfoPanelWrapper thumbnail={thumbnail}>
      <ClassroomCourseInfoContainer>
        <ClassroomCourseInfoHeading>
          รายละเอียดหลักสูตร
        </ClassroomCourseInfoHeading>

        <ul>
          {courseOutline.map((event, index) => (
            <CourseOutlineItem key={`${event.title}-${index}`} $passed={event.passed}>
              {event.title.length > 39
                ? `${event.title.slice(0, 36)}...`
                : event.title}
            </CourseOutlineItem>
          ))}
        </ul>
      </ClassroomCourseInfoContainer>

      <ClassroomPanelButtonsGroup>
        <Button $light>รายละเอียดของห้องเรียน</Button>
      </ClassroomPanelButtonsGroup>
    </ClassroomInfoPanelWrapper>
  )
}