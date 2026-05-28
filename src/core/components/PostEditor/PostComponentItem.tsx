'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

const PostComponentItemWrapper = styled.div`
  display: inline-block;

  width: 45%;

  padding: 1em;
  margin: 0.5em 0.3em;

  border-radius: 5px;

  background-color: #fff;

  text-align: center;

  font-size: 1.4em;
  font-weight: 400;

  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};

  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

type PostComponentItemProps = {
  name: string
  children?: ReactNode
  onClick?: () => void
}

export default function PostComponentItem({
  name,
  children,
  ...props
}: PostComponentItemProps) {
  return (
    <PostComponentItemWrapper {...props}>
      {children ?? name}
    </PostComponentItemWrapper>
  )
}