import styled from 'styled-components'

interface LogoTabProps {
  $authenticated?: boolean
}

const LogoTab = styled.div<LogoTabProps>`
  display: inline-block;
  color: #fff;

  width: ${({ $authenticated }) =>
    $authenticated ? '15%' : '50%'};

  a {
    background-color: #3a82ea;
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    color: inherit;
    font-size: 1.2em;
    font-weight: 400;
  }

  @media (max-width: 900px) {
    text-align: center;
    display: block;
    width: 100%;
  }
`

export default LogoTab
