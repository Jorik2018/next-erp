import Link from 'next/link'
import styled from 'styled-components'

import NavbarLinksContainer from './NavbarLinksContainer'
import NavbarContainer from './NavbarContainer'
import ButtonsTab from './ButtonsTab'
import NavbarLink from './NavbarLink'
import { InfoBadge } from '../Badge'
import { Button } from '../Button'
import LogoTab from './LogoTab'
import Navbar from './Navbar'
import SearchTab from '@/lib/components/SearchTab/SearchTab'

import {
  HOME_PAGE,
  DASHBOARD_PAGE,
  PROFILE_PAGE
} from '../../constants/endpoints/ui'
import { AuthenticatedUser } from '@/lib/types/user'

const NavbarMenuButton = styled(Button)`
  display: none;

  @media (max-width: 900px) {
    display: inline-block;
  }
`

interface AuthenticatedNavProps {
  showChatroomModal: () => void
  showNotificationModal: () => void
  activeUser: AuthenticatedUser
}

/**
 * @name AuthenticatedNav
 * @description Navigation bar displayed when the user is authenticated.
 */
const AuthenticatedNav = ({
  showChatroomModal,
  showNotificationModal,
  activeUser
}: AuthenticatedNavProps) => (
  <Navbar>
    <NavbarContainer>
      <LogoTab $authenticated>
        <Link href={HOME_PAGE} prefetch>
          LEARNSPACE
        </Link>

        <NavbarMenuButton
          $light
          $marginLeft="2em"
          $marginRight="2em"
          type="button"
          onClick={() => alert('Hello')}
        >
          Menu
        </NavbarMenuButton>
      </LogoTab>

      <SearchTab />

      <ButtonsTab>
        <NavbarLinksContainer>
          <NavbarLink>
            <Link href={DASHBOARD_PAGE} prefetch>
              Home
            </Link>
          </NavbarLink>

          <NavbarLink>
            <Link
              href={{
                pathname: PROFILE_PAGE,
                query: { id: activeUser.id }
              }}
              prefetch
            >
              Profile
            </Link>
          </NavbarLink>

          <NavbarLink>
            <Button
              type="button"
              onClick={showChatroomModal}
            >
              Chat
              <InfoBadge>12</InfoBadge>
            </Button>
          </NavbarLink>

          <NavbarLink>
            <Button
              type="button"
              onClick={showNotificationModal}
            >
              Notifications
              <InfoBadge>5</InfoBadge>
            </Button>
          </NavbarLink>

          <NavbarLink>
            <Button $light type="button">
              Log out
            </Button>
          </NavbarLink>
        </NavbarLinksContainer>
      </ButtonsTab>
    </NavbarContainer>
  </Navbar>
)

export default AuthenticatedNav