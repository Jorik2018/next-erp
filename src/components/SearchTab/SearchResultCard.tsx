'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import Card, { Footer, Body } from '../Card'
import { SEARCH_RESULT_PAGE } from '@/constants/endpoints/ui'

interface SearchResultCardWrapperProps {
  $show: boolean
}

const SearchResultCardWrapper = styled(
  Card
)<SearchResultCardWrapperProps>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  margin: 0 0 0 0.5em;
  padding: 1em 0.5em;
  position: absolute;
  height: 300px;
  width: 400px;

  @media (max-width: 900px) {
    position: fixed;
    width: 100%;
    left: 0;
    margin: 0;
  }
`

const MoreSearchResultLink = styled(Link)`
  color: ${({ theme }) => theme.PRIMARY_COLOR};
  font-size: 1em;
  font-weight: 400;
  cursor: pointer;
`

interface SearchResultCardProps {
  children: ReactNode
  show: boolean
}

const SearchResultCard = ({
  children,
  show
}: SearchResultCardProps) => (
  <SearchResultCardWrapper $show={show}>
    <Body $height="230px" $overflowY="scroll">
      {children}
    </Body>

    <Footer $textCenter>
      <MoreSearchResultLink href={SEARCH_RESULT_PAGE}>
        View all search results
      </MoreSearchResultLink>
    </Footer>
  </SearchResultCardWrapper>
)

export default SearchResultCard