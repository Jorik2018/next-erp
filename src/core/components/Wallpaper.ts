'use client'

import styled from 'styled-components'

type WallpaperProps = {
  $pageName?: string
  $backgroundColor?: string
  $height?: string
}

const Wallpaper = styled.div<WallpaperProps>`
  padding: 0;
  margin: 0;

  width: 100%;
  height: ${p => p.$height ?? '100vh'};
  background-color: ${p => p.$backgroundColor ?? '#3a82ea'};

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

export default Wallpaper