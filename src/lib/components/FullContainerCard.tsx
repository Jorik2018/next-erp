import type { ReactNode } from 'react'

import Card, { Header, Body } from './Card'

interface FullContainerCardProps {
  header: string
  children?: ReactNode
  $marginTop?: string
  $marginBottom?: string
  $marginLeft?: string
  $marginRight?: string
}

/**
 * @name FullContainerCard
 * @desc A Card component with a full width
 */
const FullContainerCard = ({
  header,
  children,
  $marginTop,
  $marginBottom,
  $marginLeft,
  $marginRight
}: FullContainerCardProps) => (
  <Card
    $fluidWidth
    $marginTop={$marginTop}
    $marginBottom={$marginBottom}
    $marginLeft={$marginLeft}
    $marginRight={$marginRight}
  >
    <Header>{header}</Header>

    <Body
      $height="590px"
      style={{
        textAlign: 'center',
        background: '#efefef',
        paddingTop: '2em',
        paddingBottom: '2em'
      }}
    >
      {children}
    </Body>
  </Card>
)

export default FullContainerCard