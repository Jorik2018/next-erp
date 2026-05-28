'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

const ListWrapper = styled.div`
  margin: 1em auto;

  h1 {
    color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
    font-size: 1.3em;
    font-weight: 400;
    display: block;
    text-align: left;
    margin-top: 1em;
  }

  ol {
    li {
      font-family: 'Calibri';
      font-size: 1em;
      color: #777;
    }
  }
`

type ListProps = {
  children: ReactNode
  description: string
}

export default function List({
  children,
  description,
}: ListProps) {
  return (
    <ListWrapper>
      <h1>{description}</h1>

      <ol>{children}</ol>
    </ListWrapper>
  )
}