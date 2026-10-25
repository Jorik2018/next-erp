import styled from 'styled-components'

interface ContainerProps {
  $transparent?: boolean
  $margin?: string
  $marginTop?: string
  $marginBottom?: string
  $marginLeft?: string
  $marginRight?: string
}

/**
 * @name Container
 * @desc Wrap all components so everything is properly centered
 */
const Container = styled.div<ContainerProps>`
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;

  margin: ${({ $margin }) => $margin || '0 auto'};
  margin-top: ${({ $marginTop }) => $marginTop || '0'};
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '0'};
  margin-left: ${({ $marginLeft }) => $marginLeft || 'auto'};
  margin-right: ${({ $marginRight }) => $marginRight || 'auto'};
  
  width: 100%;
  height: auto;

  background: ${({ $transparent }) =>
    $transparent ? 'transparent' : '#f5f5f5'};
`

export default Container