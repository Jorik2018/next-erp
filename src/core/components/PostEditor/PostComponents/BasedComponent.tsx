'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

import { CircleButton } from '../../Button'

const TestComponentWrapper = styled.div`
  position: relative;
  margin-top: 2em;
  margin-bottom: 3em;
`

type BasedComponentProps = {
  children: ReactNode
  type: string
  order: number
  removePostComponent: (order: number) => void
  showEditPostComponentModal: (type: string, order: number) => void
}

export default function BasedComponent({
  children,
  type,
  order,
  removePostComponent,
  showEditPostComponentModal,
}: BasedComponentProps) {
  return (
    <TestComponentWrapper>
      <CircleButton
        $danger
        $position="absolute"
        $left="-9.5em"
        type="button"
        $top="0em"
        onClick={() => removePostComponent(order)}
      >
        -
      </CircleButton>

      <CircleButton
        $primary
        $position="absolute"
        type="button"
        $left="-6em"
        $top="0em"
        onClick={() => showEditPostComponentModal(type, order)}
      >
        /
      </CircleButton>

      {children}
    </TestComponentWrapper>
  )
}