'use client'

import type { ReactNode } from 'react'

import Card, { Header, Body } from '../Card'

type SearchResultGroupProps = {
  header: string
  children: ReactNode
}

export default function SearchResultGroup({
  children,
  header,
}: SearchResultGroupProps) {
  return (
    <Card $fluidWidth $marginBottom="3em">
      <Header>{header}</Header>

      <Body
        $height="590px"
        style={{
          textAlign: 'center',
        }}
      >
        {children}
      </Body>
    </Card>
  )
}