'use client'

import styled from 'styled-components'

const ButtonsTab = styled.div`
  display: inline-block;
  width: 50%;

  padding-right: 1em;

  text-align: right;

  @media (max-width: 900px) {
    display: block;
    width: 100%;

    margin: 2em auto;
    padding-right: 0;

    text-align: center;
  }
`

export default ButtonsTab