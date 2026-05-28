'use client'

import styled, { CSSProperties, keyframes } from 'styled-components'

const spinningAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(45deg) scale(1.1);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
`

type LoadingIconProps = {
  style?: CSSProperties
}


const LoadingSpinner = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 150px;
  height: 150px;

  margin: 5em auto;

  border-radius: 50%;

  background: #fff;

  font-size: 1.4em;

  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};

  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.2);

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: -10px;
    left: -10px;

    width: 150px;
    height: 150px;

    display: block;

    border-radius: 50%;

    border: 10px solid transparent;

    border-top-color: ${p =>
      p.theme?.PRIMARY_COLOR ?? '#0070f3'};

    border-bottom-color: ${p =>
      p.theme?.PRIMARY_COLOR ?? '#0070f3'};

    animation: ${spinningAnimation} 800ms linear infinite;
  }
`

export default function LoadingIcon({ style }: LoadingIconProps) {
  return <LoadingSpinner style={style}>Loading</LoadingSpinner>
}