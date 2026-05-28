'use client'

import styled from 'styled-components'

type ButtonProps = {
  $fluidWidth?: boolean
  $fluidHeight?: boolean

  $rounded?: boolean

  $textCenter?: boolean
  $textRight?: boolean
  $textLeft?: boolean

  $primary?: boolean
  $info?: boolean
  $success?: boolean
  $warning?: boolean
  $danger?: boolean
  $light?: boolean

  $margin?: string
  $marginTop?: string
  $marginBottom?: string
  $marginLeft?: string
  $marginRight?: string

  $padding?: string

  disabled?: boolean
}

type CircleButtonProps = ButtonProps & {
  $position?: string
  $right?: string
  $left?: string
  $bottom?: string
  $top?: string
}

const getBackgroundColor = (p: ButtonProps & { theme: any }) => {
  if (p.$primary) {
    return p.theme?.PRIMARY_COLOR ?? '#0070f3'
  }

  if (p.$info) {
    return p.theme?.INFO_COLOR ?? '#0ea5e9'
  }

  if (p.$danger) {
    return p.theme?.DANGER_COLOR ?? '#ef4444'
  }

  if (p.$warning) {
    return p.theme?.WARNING_COLOR ?? '#f59e0b'
  }

  if (p.$success) {
    return p.theme?.SUCCESS_COLOR ?? '#22c55e'
  }

  if (p.$light) {
    return '#fff'
  }

  return p.theme?.PRIMARY_COLOR ?? '#0070f3'
}

const getTextColor = (p: ButtonProps & { theme: any }) => {
  if (p.$light) {
    return p.theme?.PRIMARY_COLOR ?? '#0070f3'
  }

  return '#fff'
}

export const Button = styled.button<ButtonProps>`
  width: ${p => (p.$fluidWidth ? '100%' : 'auto')};

  height: ${p => (p.$fluidHeight ? '100%' : 'auto')};

  padding: ${p =>
    p.$padding
      ? p.$padding
      : p.$rounded
        ? '0.5em 1em'
        : '0.4em 1em'};

  margin: ${p => p.$margin ?? '0'};

  margin-top: ${p => p.$marginTop ?? '0'};

  margin-bottom: ${p => p.$marginBottom ?? '0'};

  margin-left: ${p => p.$marginLeft ?? '0'};

  margin-right: ${p => p.$marginRight ?? '0'};

  border: none;

  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};

  font-size: 1em;

  font-weight: 300;

  text-align: ${p =>
    p.$textCenter
      ? 'center'
      : p.$textRight
        ? 'right'
        : p.$textLeft
          ? 'left'
          : 'left'};

  border-radius: ${p =>
    p.$rounded
      ? '50%'
      : p.theme?.BORDER_RADIUS ?? '8px'};

  background-color: ${p => getBackgroundColor(p)};

  color: ${p => getTextColor(p)};

  opacity: ${p => (p.disabled ? 0.6 : 1)};

  transition:
    transform 150ms ease-in,
    background-color 150ms ease-in,
    color 150ms ease-in;

  &:active {
    transform: ${p => (p.disabled ? 'none' : 'scale(1.05)')};
  }
`

export const CircleButton = styled(Button)<CircleButtonProps>`
  position: ${p => p.$position ?? 'static'};

  right: ${p => p.$right ?? ''};

  left: ${p => p.$left ?? ''};

  bottom: ${p => p.$bottom ?? ''};

  top: ${p => p.$top ?? ''};

  border-radius: 50%;

  padding: ${p => p.$padding ?? '0.5em 1em'};

  font-size: 1.1em;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #fff;

    color: ${p =>
      p.$primary
        ? p.theme?.PRIMARY_COLOR ?? '#0070f3'
        : p.$info
          ? p.theme?.INFO_COLOR ?? '#0ea5e9'
          : p.$danger
            ? p.theme?.DANGER_COLOR ?? '#ef4444'
            : p.$warning
              ? p.theme?.WARNING_COLOR ?? '#f59e0b'
              : p.$success
                ? p.theme?.SUCCESS_COLOR ?? '#22c55e'
                : p.$light
                  ? p.theme?.PRIMARY_COLOR ?? '#0070f3'
                  : ''};
  }
`