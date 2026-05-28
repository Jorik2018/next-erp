'use client'

import styled from 'styled-components'

import Card from '../Card'

const SearchHeaderPanelHeading = styled.h1`
  color: #777;
  font-size: 1.2em;
  font-weight: 400;
`

const SearchHeaderPanelWrapper = styled(Card)`
  position: absolute;
  left: 0;
  max-width: 100%;
  padding: 2em;
  text-align: center;
`

const SearchQuery = styled.h1`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  font-size: 1.7em;
  font-weight: 400;
  cursor: pointer;
`

type SearchHeaderPanelProps = {
  searchQuery?: string
}

/**
 * @name SearchHeaderPanel
 * @desc Showing the search query and some other information about the search results
 */
export default function SearchHeaderPanel({
  searchQuery,
}: SearchHeaderPanelProps) {
  return (
    <SearchHeaderPanelWrapper>
      <SearchHeaderPanelHeading>
        ผลการค้นหาสำหรับ
      </SearchHeaderPanelHeading>

      <SearchQuery>&quot;{searchQuery}&quot;</SearchQuery>
    </SearchHeaderPanelWrapper>
  )
}