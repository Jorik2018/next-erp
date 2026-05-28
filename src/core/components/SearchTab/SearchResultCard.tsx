'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import styled from 'styled-components'

import Card, { Footer, Body } from '../Card'

type SearchResultCardWrapperProps = {
  $show: boolean
}

const SearchResultCardWrapper = styled(Card)<SearchResultCardWrapperProps>`
  display: ${p => (p.$show ? 'block' : 'none')};

  position: absolute;

  width: 400px;
  height: 300px;

  margin: 0 0 0 0.5em;
  padding: 1em 0.5em;

  border-top-right-radius: 0;
  border-top-left-radius: 0;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 900px) {
    position: fixed;

    width: 100%;

    left: 0;

    margin: 0;
  }
`

const MoreSearchResultLink = styled.span`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  font-size: 1em;
  font-weight: 400;
  cursor: pointer;
`

type SearchResultCardProps = {
  children: ReactNode
  show: boolean
}

export default function SearchResultCard({
  children,
  show,
}: SearchResultCardProps) {
  return (
    <SearchResultCardWrapper $show={show}>
      <Body $height="230px" $overflowY="scroll">
        {children}
      </Body>

      <Footer $textCenter>
        <Link href="/">
          <MoreSearchResultLink>
            ดูผลการค้นหาทั้งหมด
          </MoreSearchResultLink>
        </Link>
      </Footer>
    </SearchResultCardWrapper>
  )
}