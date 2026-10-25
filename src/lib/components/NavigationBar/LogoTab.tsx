import styled from 'styled-components'

interface LogoTabProps {
  $authenticated?: boolean
}

const LogoTab = styled.div<LogoTabProps>`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  color: #fff;

  a {
    color: inherit;
    font-size: 1.15rem;
    font-weight: 600;
    text-decoration: none;
  }
`

export default LogoTab