'use client'

import styled from 'styled-components'

type ContainerProps = {
  $transparent?: boolean
  $margin?: string
  $marginTop?: string
  $marginBottom?: string
  $marginLeft?: string
  $marginRight?: string
}

const Container = styled.div<ContainerProps>`
  padding-top: 2.5em;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;

  margin: ${p => p.$margin ?? '0 auto'};
  margin-top: ${p => p.$marginTop ?? '0'};
  margin-bottom: ${p => p.$marginBottom ?? '0'};
  margin-left: ${p => p.$marginLeft ?? 'auto'};
  margin-right: ${p => p.$marginRight ?? 'auto'};

  max-width: 1400px;
  width: 100%;
  height: auto;

  background: ${p =>
    p.$transparent ? 'transparent' : '#f5f5f5'};
`

export default Container
