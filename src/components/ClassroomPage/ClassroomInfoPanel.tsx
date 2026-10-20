import type { ReactNode } from 'react'
import styled from 'styled-components'

import { Button } from '../Button'
import Card from '../Card'

const ClassroomInfoPanelCard = styled(Card)`
  margin: 1.5em auto 0;
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
  object-fit: cover;
`

const ClassroomCourseInfoContainer = styled.div`
  padding: 3em 3em 1em;
  width: 100%;
`

const ClassroomCourseInfoHeading = styled.h2`
  color: ${({ theme }) => theme.PRIMARY_COLOR};
  text-align: center;
  font-weight: 400;
`

interface CourseOutlineItemProps {
  $passed?: boolean
}

const CourseOutlineItem = styled.li<CourseOutlineItemProps>`
  font-size: 1.1em;
  font-weight: 300;
  color: ${({ $passed, theme }) =>
    $passed ? theme.PRIMARY_COLOR : '#777'};
`

const ClassroomPanelButtonsGroup = styled.div`
  text-align: center;
  margin: 1em auto;
`

interface ClassroomInfoPanelWrapperProps {
  children: ReactNode
  thumbnail: string
}

const ClassroomInfoPanelWrapper = ({
  children,
  thumbnail
}: ClassroomInfoPanelWrapperProps) => (
  <ClassroomInfoPanelCard>
    <ClassroomThumbnailImage
      src={thumbnail}
      alt="Classroom thumbnail"
    />

    {children}
  </ClassroomInfoPanelCard>
)

interface CourseOutlineEvent {
  title: string
  passed: boolean
}

interface ClassroomInfoPanelProps {
  courseOutline: CourseOutlineEvent[]
  thumbnail: string
}

/**
 * @name ClassroomInfoPanel
 * @desc Displays classroom information.
 */
const ClassroomInfoPanel = ({
  courseOutline,
  thumbnail
}: ClassroomInfoPanelProps) => (
  <ClassroomInfoPanelWrapper thumbnail={thumbnail}>
    <ClassroomCourseInfoContainer>
      <ClassroomCourseInfoHeading>
        Course Details
      </ClassroomCourseInfoHeading>

      <ul>
        {courseOutline.map((event, index) => (
          <CourseOutlineItem
            key={index}
            $passed={event.passed}
          >
            {event.title.length > 39
              ? `${event.title.slice(0, 36)}...`
              : event.title}
          </CourseOutlineItem>
        ))}
      </ul>
    </ClassroomCourseInfoContainer>

    <ClassroomPanelButtonsGroup>
      <Button $light type="button">
        Classroom Details
      </Button>
    </ClassroomPanelButtonsGroup>
  </ClassroomInfoPanelWrapper>
)

export default ClassroomInfoPanel