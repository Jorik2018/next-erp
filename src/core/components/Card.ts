'use client'

import styled from 'styled-components'

type CardProps = {
  $marginTop?: string
  $marginBottom?: string
  $marginLeft?: string
  $marginRight?: string
  $padding?: string
  $small?: boolean
  $large?: boolean
  $fluidWidth?: boolean
  $textCenter?: boolean
  $height?: string
  $noShadow?: boolean
}

type FooterProps = {
  $textCenter?: boolean
}

type BodyProps = {
  $overflowY?: string
  $height?: string
}

const Card = styled.div<CardProps>`
  width: 100%;

  max-width: ${p =>
    p.$large
      ? '700px'
      : p.$small
        ? '400px'
        : p.$fluidWidth
          ? '100%'
          : '500px'};

  height: ${p => p.$height ?? 'auto'};

  background-color: #fff;

  margin-top: ${p => p.$marginTop ?? '0'};
  margin-bottom: ${p => p.$marginBottom ?? '0'};
  margin-left: ${p => p.$marginLeft ?? 'auto'};
  margin-right: ${p => p.$marginRight ?? 'auto'};

  padding: ${p => p.$padding ?? '0'};

  box-shadow: ${p =>
    p.$noShadow ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.1)'};

  border-radius: 7px;
  text-align: ${p => (p.$textCenter ? 'center' : 'left')};
`

export const Header = styled.div`
  padding: 1.2em;
  margin: 0 auto;
  text-align: center;
  font-family: 'Kanit';
  font-size: 1em;
  font-weight: 400;
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
`

export const Footer = styled.div<FooterProps>`
  padding: 0.9em;
  margin: 0 auto;
  text-align: ${p => (p.$textCenter ? 'center' : 'left')};
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
`

export const Body = styled.div<BodyProps>`
  padding: 0.9em;
  margin: 0 auto;
  text-align: left;
  font-size: 1em;
  font-weight: 300;
  color: ${p => p.theme?.TEXT_COLOR ?? '#333'};
  height: ${p => p.$height ?? 'auto'};
  overflow-y: ${p => p.$overflowY ?? 'auto'};
`

export default Card