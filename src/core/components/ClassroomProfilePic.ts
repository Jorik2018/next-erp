'use client'

import styled from 'styled-components'

type ClassroomProfilePicProps = {
  $src?: string
  $size?: string
  $top?: string
  $left?: string
}

const ClassroomProfilePic = styled.div<ClassroomProfilePicProps>`
  width: ${p => p.$size ?? '150px'};
  height: ${p => p.$size ?? '150px'};

  padding: 1.5em;

  border-radius: 50%;

  background: ${p =>
    p.$src ? `url(${p.$src}) center/cover no-repeat` : '#c8c8c8'};

  position: absolute;

  margin-top: ${p => p.$top ?? '-8em'};
  margin-left: ${p => p.$left ?? '31em'};

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`

export default ClassroomProfilePic