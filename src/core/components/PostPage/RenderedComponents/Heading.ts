'use client'

import styled from 'styled-components'

const Heading = styled.h1`
  display: block;

  text-align: center;

  font-size: 2em;
  font-weight: 500;

  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
`

export default Heading