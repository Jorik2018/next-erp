'use client'

import Link from 'next/link'
import styled from 'styled-components'

import NavbarLinksContainer from './NavbarLinksContainer'
import NavbarContainer from './NavbarContainer'
import SearchTab from '../SearchTab/SearchTab'
import ButtonsTab from './ButtonsTab'
import NavbarLink from './NavbarLink'
import { InfoBadge } from '../Badge'
import { Button } from '../Button'
import LogoTab from './LogoTab'
import Navbar from './Navbar'

import {
  HOME_PAGE,
  DASHBOARD_PAGE,
  PROFILE_PAGE,
} from '../../constants/endpoints/ui'

type ActiveUser = {
  _id: string
}

type AuthenticatedNavProps = {
  showChatroomModal: () => void
  showNotificationModal: () => void
  activeUser: ActiveUser
}

const NavbarMenuButton = styled(Button)`
  display: none;

  @media (max-width: 900px) {
    display: inline-block;
  }
`

export default function AuthenticatedNav({
  showChatroomModal,
  showNotificationModal,
  activeUser,
}: AuthenticatedNavProps) {
  return (
    <Navbar>
      <NavbarContainer>
        <LogoTab $authenticated>
          <Link href={HOME_PAGE}>LEARNSPACE</Link>

          <NavbarMenuButton
            $light
            $marginLeft="2em"
            $marginRight="2em"
            onClick={() => alert('Hello')}
          >
            Menu
          </NavbarMenuButton>
        </LogoTab>

        <SearchTab />

        <ButtonsTab>
          <NavbarLinksContainer>
            <NavbarLink>
              <Link href={DASHBOARD_PAGE}>หน้าหลัก</Link>
            </NavbarLink>

            <NavbarLink>
              <Link href={{ pathname: PROFILE_PAGE, query: { id: activeUser._id } }}>
                โปรไฟล์
              </Link>
            </NavbarLink>

            <NavbarLink>
              <button type="button" onClick={showChatroomModal}>
                แชท
                <InfoBadge>12</InfoBadge>
              </button>
            </NavbarLink>

            <NavbarLink>
              <button type="button" onClick={showNotificationModal}>
                การแจ้งเตือน
                <InfoBadge>5</InfoBadge>
              </button>
            </NavbarLink>

            <NavbarLink>
              <Button $light>ออกจากระบบ</Button>
            </NavbarLink>
          </NavbarLinksContainer>
        </ButtonsTab>
      </NavbarContainer>
    </Navbar>
  )
}