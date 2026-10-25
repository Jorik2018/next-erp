import styled from 'styled-components'

const NavbarContainer = styled.div`
  width: 100%;
  min-height: 64px;
  padding:0px 12px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 900px) {
    min-height: 56px;
    padding: 0 1rem;
  }
`

export default NavbarContainer