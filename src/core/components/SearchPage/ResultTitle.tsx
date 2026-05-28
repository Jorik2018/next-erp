'use client'

import styled from 'styled-components'

const Title = styled.h2`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  font-size: 1.2em;
  font-weight: 500;
  text-align: center;
`

type ResultTitleProps = {
  children: string
}

export default function ResultTitle({
  children,
}: ResultTitleProps) {
  const truncatedTitle =
    children.length > 27
      ? `${children.substring(0, 27)}...`
      : children

  return <Title>{truncatedTitle}</Title>
}