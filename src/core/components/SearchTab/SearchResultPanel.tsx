'use client'

import SearchResultCard from './SearchResultCard'
import SearchResultItem from './SearchResultItem'

type SearchResultPanelProps = {
  show: boolean
}

const searchResults = [
  'Tony Stark',
  'Chris Redfield',
  'Introduction to Computer Science',
  'Steve Rogers',
  'Calculus II',
  'Nick Fury',
]

export default function SearchResultPanel({
  show,
}: SearchResultPanelProps) {
  return (
    <SearchResultCard show={show}>
      {searchResults.map(result => (
        <SearchResultItem key={result} name={result} />
      ))}
    </SearchResultCard>
  )
}