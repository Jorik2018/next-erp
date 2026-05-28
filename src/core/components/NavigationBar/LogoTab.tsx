'use client'

import styled from 'styled-components'

type LogoTabProps = {
  $authenticated?: boolean
}

const LogoTab = styled.div<LogoTabProps>`
  display: inline-block;

  color: #fff;

  width: ${p => (p.$authenticated ? '15%' : '50%')};

  a {
    display: inline-block;

    padding: 0.5em 1em;

    background-color: #3a82ea;

    color: inherit;

    text-decoration: none;

    font-size: 1.2em;
    font-weight: 400;
  }

  @media (max-width: 900px) {
    display: block;
    width: 100%;
    text-align: center;
  }
`

export default LogoTab