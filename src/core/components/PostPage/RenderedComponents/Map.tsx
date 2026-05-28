'use client'

import styled from 'styled-components'

const MapWrapper = styled.div`
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #ddd;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`

export default function Map() {
  return <MapWrapper>Map</MapWrapper>
}