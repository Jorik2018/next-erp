'use client'

import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import NavbarLinksContainer from './NavbarLinksContainer'
import NavbarContainer from './NavbarContainer'
import ButtonsTab from './ButtonsTab'
import NavbarLink from './NavbarLink'
import LogoTab from './LogoTab'
import Navbar from './Navbar'

import type { AuthenticatedUser } from '@/lib/types/user'
import SearchTab from '../SearchTab/SearchTab'
import { InfoBadge } from '../Badge'
import { Button } from '@/lib/ui/button'
import { DASHBOARD_PAGE, HOME_PAGE, PROFILE_PAGE } from '@/lib/constants/endpoints/ui'

const NavbarMenuButton = styled.button`
  display: none;
  margin-left: auto;

  padding: 0.5rem 0.75rem;

  border: 0;
  border-radius: 6px;

  background: rgba(255, 255, 255, 0.15);
  color: #fff;

  font-size: 1.25rem;
  line-height: 1;

  cursor: pointer;

  @media (max-width: 900px) {
    display: block;
  }
`

const MobileMenu = styled.div<{
  $open: boolean
}>`
  display: none;

  @media (max-width: 900px) {
    display: ${({ $open }) =>
      $open ? 'flex' : 'none'};

    flex-direction: column;
    gap: 0.5rem;

    width: 100%;
    padding: 1rem;

    background-color: #3b90f9;

    border-top: 1px solid
      rgba(255, 255, 255, 0.15);
  }
`

const MobileLink = styled(Link)`
  display: block;

  padding: 0.75rem;

  border-radius: 6px;

  color: #fff;
  text-decoration: none;

  &:hover {
    background-color:
      rgba(255, 255, 255, 0.15);
  }
`

const MobileButton = styled.button`
  width: 100%;

  padding: 0.75rem;

  border: 0;
  border-radius: 6px;

  background: transparent;
  color: #fff;

  text-align: left;

  cursor: pointer;

  &:hover {
    background-color:
      rgba(255, 255, 255, 0.15);
  }
`

interface AuthenticatedNavProps {
  showChatroomModal: () => void
  showNotificationModal: () => void
  activeUser: AuthenticatedUser
}

const AuthenticatedNav = ({
  showChatroomModal,
  showNotificationModal,
  activeUser
}: AuthenticatedNavProps) => {
  const [menuOpen, setMenuOpen] =
    useState(false)

  const closeMenu = () =>
    setMenuOpen(false)

  return (
    <Navbar>
      <NavbarContainer>
        <LogoTab>
          <Link href={HOME_PAGE}>
            LEARNSPACE
          </Link>
        </LogoTab>

        <SearchTab />

        <ButtonsTab>
          <NavbarLinksContainer>
            <NavbarLink>
              <Link href={DASHBOARD_PAGE}>
                Home
              </Link>
            </NavbarLink>

            <NavbarLink>
              <Link
                href={{
                  pathname: PROFILE_PAGE,
                  query: {
                    id: activeUser.id
                  }
                }}
              >
                Profile
              </Link>
            </NavbarLink>

            <NavbarLink>
              <Button
                type="button"
                onClick={
                  showChatroomModal
                }
              >
                Chat
                <InfoBadge>
                  12
                </InfoBadge>
              </Button>
            </NavbarLink>

            <NavbarLink>
              <Button
                type="button"
                onClick={
                  showNotificationModal
                }
              >
                Notifications
                <InfoBadge>
                  5
                </InfoBadge>
              </Button>
            </NavbarLink>

            <NavbarLink>
              <Button
               
                type="button"
              >
                Log out
              </Button>
            </NavbarLink>
          </NavbarLinksContainer>
        </ButtonsTab>

        <NavbarMenuButton
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(
              current => !current
            )
          }
        >
          {menuOpen ? '×' : '☰'}
        </NavbarMenuButton>
      </NavbarContainer>

      <MobileMenu $open={menuOpen}>
        <MobileLink
          href={DASHBOARD_PAGE}
          onClick={closeMenu}
        >
          Home
        </MobileLink>

        <MobileLink
          href={{
            pathname: PROFILE_PAGE,
            query: {
              id: activeUser.id
            }
          }}
          onClick={closeMenu}
        >
          Profile
        </MobileLink>

        <MobileButton
          type="button"
          onClick={() => {
            closeMenu()
            showChatroomModal()
          }}
        >
          Chat
          <InfoBadge>12</InfoBadge>
        </MobileButton>

        <MobileButton
          type="button"
          onClick={() => {
            closeMenu()
            showNotificationModal()
          }}
        >
          Notifications
          <InfoBadge>5</InfoBadge>
        </MobileButton>

        <MobileButton type="button">
          Log out
        </MobileButton>
      </MobileMenu>
    </Navbar>
  )
}

export default AuthenticatedNav