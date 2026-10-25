import styled from 'styled-components'
import type { ReactNode } from 'react'

import { PostComponentType } from '@/lib/helpers/post'
import { CircleButton } from '@/lib/ui/button'

const TestComponentWrapper = styled.div`
  position: relative;
  margin-top: 2em;
  margin-bottom: 3em;
`

interface BasedComponentProps {
  children: ReactNode
  type: PostComponentType
  order: number
  removePostComponent: (order: number) => void
  showEditPostComponentModal: (type: PostComponentType, order: number) => void
}

const BasedComponent = ({
  children,
  type,
  order,
  removePostComponent,
  showEditPostComponentModal
}: BasedComponentProps) => (
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
      $left="-6em"
      type="button"
      $top="0em"
      onClick={() => showEditPostComponentModal(type, order)}
    >
      /
    </CircleButton>

    {children}
  </TestComponentWrapper>
)

export default BasedComponent