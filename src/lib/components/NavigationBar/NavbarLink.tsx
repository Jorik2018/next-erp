import styled from 'styled-components'

const NavbarLink = styled.li`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;

    padding: 0.55rem 0.75rem;

    border-radius: 6px;

    color: #fff;

    font-size: 0.95rem;
    font-weight: 400;
    text-decoration: none;

    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`

export default NavbarLink