import Link from 'next/link'
import styled from 'styled-components'

import { CLASSROOM_PAGE } from '@/lib/constants/endpoints/ui'
import Card from '../Card'

const ClassroomHeaderCard = styled(Card)`
  position: absolute;
  left: 0;
  max-width: 100%;
  padding: 2em;
  text-align: center;
`

const ClassroomNameHeading = styled.h1`
  color: ${p => p.theme.PRIMARY_COLOR};
  font-size: 1.7em;
  font-weight: 400;
  cursor: pointer;
`
/**
 * @name ClassroomHeaderPanel
 * @desc Display the details of the classroom
 * @prop classroomID : ID of the classroom, used to determine which classroom to query from DB
 * @prop classroomName : Name of the classroom
 */
const ClassroomHeaderPanel = ({ classroomID, classroomName }: ClassroomHeaderPanelProp) => (
  <ClassroomHeaderCard>
    ห้องเรียน
    <Link href={{ pathname: CLASSROOM_PAGE, query: { id: classroomID } }} prefetch>
      <ClassroomNameHeading>{classroomName}</ClassroomNameHeading>
    </Link>
  </ClassroomHeaderCard>
)

interface ClassroomHeaderPanelProp {
  classroomID: string,
  classroomName: string
}

export default ClassroomHeaderPanel
