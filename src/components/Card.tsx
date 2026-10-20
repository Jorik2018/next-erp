'use client'

import styled from 'styled-components'

interface CardProps {
  $marginTop?: string
  $marginBottom?: string
  $marginLeft?: string
  $marginRight?: string
  $padding?: string
  $height?: string
  $small?: boolean
  $large?: boolean
  $fluidWidth?: boolean
  $textCenter?: boolean
  $noShadow?: boolean
}

const Card = styled.div<CardProps>`
  width: 100%;

  max-width: ${({ $large, $small, $fluidWidth }) =>
    $large
      ? '700px'
      : $small
        ? '400px'
        : $fluidWidth
          ? '100%'
          : '500px'};

  height: ${({ $height }) => $height || 'auto'};

  background-color: #fff;

  margin-top: ${({ $marginTop }) => $marginTop || '0'};
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '0'};
  margin-left: ${({ $marginLeft }) => $marginLeft || 'auto'};
  margin-right: ${({ $marginRight }) => $marginRight || 'auto'};

  padding: ${({ $padding }) => $padding || '0'};

  box-shadow: ${({ $noShadow }) =>
    $noShadow ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.1)'};

  border-radius: 7px;

  text-align: ${({ $textCenter }) =>
    $textCenter ? 'center' : 'left'};
`

export const Header = styled.div`
  padding: 1.2em;
  margin: 0 auto;
  text-align: center;
  font-family: 'Kanit';
  font-size: 1em;
  font-weight: 400;
  color: ${({ theme }) => theme.PRIMARY_COLOR};
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
`

interface FooterProps {
  $textCenter?: boolean
}

export const Footer = styled.div<FooterProps>`
  padding: 0.9em;
  margin: 0 auto;

  text-align: ${({ $textCenter }) =>
    $textCenter ? 'center' : 'left'};

  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
`

interface BodyProps {
  $height?: string
  $overflowY?: string
}

export const Body = styled.div<BodyProps>`
  padding: 0.9em;
  margin: 0 auto;
  text-align: left;
  font-size: 1em;
  font-weight: 300;

  color: ${({ theme }) => theme.TEXT_COLOR};

  height: ${({ $height }) => $height || 'auto'};

  overflow-y: ${({ $overflowY }) =>
    $overflowY || 'auto'};
`

export default Card