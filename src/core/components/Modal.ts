'use client'

import styled, { keyframes } from 'styled-components'

import Card from './Card'

const ModalBackgroundAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const ModalPanelAnimation = keyframes`
  from { opacity: 0; transform: translateX(-5em); }
  to { opacity: 1; transform: translateX(0); }
`

type ModalBackgroundProps = {
  $show?: boolean
}

export const ModalBackground = styled.div<ModalBackgroundProps>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 88;
  background-color: rgba(240, 240, 240, 0.8);

  display: ${p => (p.$show ? 'block' : 'none')};

  overflow-y: auto;
  animation: ${ModalBackgroundAnimation} 100ms;
`

export const ModalPanel = styled(Card)`
  margin: 6em auto;
  box-shadow: 0 15px 70px rgba(0, 0, 0, 0.15);
  animation: ${ModalPanelAnimation} 600ms;
`