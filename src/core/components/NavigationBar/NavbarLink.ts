'use client'

import styled from 'styled-components'

const NavbarLink = styled.li`
  display: inline-block;

  margin: 0;
  padding: 0.4em 0.7em;

  a {
    display: block;

    padding: 0.3em 0.7em;

    border-radius: 5px;

    color: #fff;

    font-size: 1.1em;
    font-weight: 300;

    text-decoration: none;

    transition:
      background-color 150ms ease-in,
      color 150ms ease-in;

    &:hover {
      background-color: #fff;
      color: #3b90f9;
      cursor: pointer;
    }
  }

  @media (max-width: 900px) {
    display: block;
    width: 100%;
    text-align: center;
  }
`

export default NavbarLink