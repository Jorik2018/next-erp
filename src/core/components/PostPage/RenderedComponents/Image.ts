'use client'

import styled from 'styled-components'

type ImageProps = {
  $height?: string
  $maxWidth?: string
  $margin?: string
}

const Image = styled.img<ImageProps>`
  display: block;

  width: 100%;
  max-width: ${p => p.$maxWidth ?? '100%'};

  height: ${p => p.$height ?? '600px'};

  margin: ${p => p.$margin ?? '2em auto'};

  background-color: #ddd;

  border: none;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`

export default Image