'use client'

import styled from 'styled-components'

type PanelProps = {
  $width?: number
  $height?: string
  $padding?: string
  $paddingTop?: string
  $paddingBottom?: string
  $paddingLeft?: string
  $paddingRight?: string
  $left?: boolean
  $right?: boolean
}

const Panel = styled.div<PanelProps>`
  display: block;

  width: ${p => (p.$width ? `${p.$width}%` : '100%')};

  height: ${p => p.$height ?? '100%'};

  padding: ${p => p.$padding ?? '0'};
  padding-top: ${p => p.$paddingTop ?? '0'};
  padding-bottom: ${p => p.$paddingBottom ?? '0'};
  padding-left: ${p => p.$paddingLeft ?? '0'};
  padding-right: ${p => p.$paddingRight ?? '0'};

  float: ${p =>
    p.$left ? 'left' : p.$right ? 'right' : 'none'};
`

export default Panel