'use client'

import styled from 'styled-components'

const SubHeading = styled.h1`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};

  display: block;

  margin-top: 1em;

  text-align: left;

  font-size: 1.3em;
  font-weight: 400;
`

export default SubHeading