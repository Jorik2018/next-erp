'use client'

import type { ReactNode } from 'react'

import Card, { Header, Body } from './Card'

type FullContainerCardProps = {
  header: string
  children: ReactNode
}

export default function FullContainerCard({
  header,
  children,
  ...props
}: FullContainerCardProps) {
  return (
    <Card $fluidWidth {...props}>
      <Header>{header}</Header>

      <Body
        $height="590px"
        style={{
          textAlign: 'center',
          background: '#efefef',
          paddingTop: '2em',
          paddingBottom: '2em',
        }}
      >
        {children}
      </Body>
    </Card>
  )
}