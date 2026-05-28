'use client'

import styled from 'styled-components'

const VideoWrapper = styled.div`
  margin: 2em auto;

  width: 100%;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #ddd;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`

export default function Video() {
  return <VideoWrapper>Video</VideoWrapper>
}