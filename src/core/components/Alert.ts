'use client'

import styled from 'styled-components'

type ErrorAlertProps = {
  $show?: boolean
}

export const ErrorAlert = styled.div<ErrorAlertProps>`
  display: ${p => (p.$show ? 'inline-block' : 'none')};

  background-color: ${p =>
    p.theme?.DANGER_COLOR ?? '#ef4444'};

  border-radius: ${p =>
    p.theme?.BORDER_RADIUS ?? '8px'};

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);

  transition: all 150ms;

  text-align: center;

  padding: 1em 3em;

  font-size: 1.2em;

  position: fixed;

  cursor: pointer;

  border: none;

  color: #fff;

  bottom: 5em;

  right: 3em;

  z-index: 99;

  &:active {
    transform: scale(1.05);
  }
`