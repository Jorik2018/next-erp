'use client'

import styled from 'styled-components'

const SearchResultItemWrapper = styled.div`
  padding: 1em 0;

  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};

  font-weight: 400;
  font-size: 1.2em;

  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`

const SearchResultProfilePic = styled.div`
  display: inline-block;
  float: left;

  width: 30px;
  height: 30px;

  padding: 1.2em;

  margin-top: 0;
  margin-right: 1em;
  margin-bottom: 1em;

  border-radius: 50%;

  background-color: #c8c8c8;
`

type SearchResultItemProps = {
  name: string
}

export default function SearchResultItem({
  name,
}: SearchResultItemProps) {
  return (
    <SearchResultItemWrapper>
      <SearchResultProfilePic />
      {name}
    </SearchResultItemWrapper>
  )
}