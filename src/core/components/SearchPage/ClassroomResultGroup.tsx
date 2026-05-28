'use client'

import ClassroomResult from './SearchResultTypes/ClassroomResult'
import SearchResultGroup from './SearchResultGroup'
import ResultTitle from './ResultTitle'

const classrooms = [
  'Introduction to Computer Science',
  'Intro to Computer Science',
  'Introduction to Computer Engineering',
  'Introduction to Computer Science',
  'Introduction to Computer Management',
  'Introduction to Computer Science',
  'Introduction to Computer Science',
  'Introduction to Computer Science',
]

export default function ClassroomResultGroup() {
  return (
    <SearchResultGroup header="ห้องเรียน">
      {classrooms.map((classroom, index) => (
        <ClassroomResult key={`${classroom}-${index}`}>
          <ResultTitle>{classroom}</ResultTitle>
        </ClassroomResult>
      ))}
    </SearchResultGroup>
  )
}