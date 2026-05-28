'use client'

import styled from 'styled-components'

const Navbar = styled.nav`
  position: fixed;
  z-index: 100;

  top: 0;
  left: 0;

  width: 100%;

  background-color: #3b90f9;

  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 900px) {
    /* mobile styles */
  }
`

export default Navbar