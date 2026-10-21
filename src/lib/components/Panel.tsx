import styled from 'styled-components'

interface PanelProps {
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

/**
 * @name Panel
 * @desc Separate a layout into 2 parts
 */
const Panel = styled.div<PanelProps>`
  display: block;

  width: ${({ $width }) =>
    $width !== undefined ? `${$width}%` : '100%'};

  height: ${({ $height }) => $height || '100%'};

  padding: ${({ $padding }) => $padding || '0'};
  padding-top: ${({ $paddingTop }) => $paddingTop || '0'};
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom || '0'};
  padding-left: ${({ $paddingLeft }) => $paddingLeft || '0'};
  padding-right: ${({ $paddingRight }) => $paddingRight || '0'};

  float: ${({ $left, $right }) =>
    $left ? 'left' : $right ? 'right' : 'none'};
`

export default Panel