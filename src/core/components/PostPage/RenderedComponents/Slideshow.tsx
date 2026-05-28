'use client'

import { useState } from 'react'
import styled from 'styled-components'

type SlideshowImage = {
  url: string
  alt?: string
}

type SlideshowProps = {
  images?: SlideshowImage[]
}

const SlideshowWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 500px;
  margin: 2em auto;
  position: relative;
  align-items: center;
  background-color: #ddd;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`

const TransitionButton = styled.button`
  top: 40%;
  cursor: pointer;
  position: absolute;
  z-index: 20;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.7);
`

const PrevButton = styled(TransitionButton)`
  left: 1em;
`

const NextButton = styled(TransitionButton)`
  right: 1em;
`

const ImagesWrapper = styled.div`
  width: 100%;
  height: 500px;
`

const Image = styled.img`
  width: 100%;
  max-width: 1200px;
  height: 500px;
  position: absolute;
  object-fit: cover;
`

export default function Slideshow({ images = [] }: SlideshowProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const totalImages = images.length
  const imageToRender = images[currentImage]

  const toPrevImage = () => {
    if (!totalImages) return

    setCurrentImage(prev => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  const toNextImage = () => {
    if (!totalImages) return

    setCurrentImage(prev => (prev === totalImages - 1 ? 0 : prev + 1))
  }

  if (!totalImages) {
    return null
  }

  return (
    <SlideshowWrapper>
      <PrevButton type="button" onClick={toPrevImage}>
        Previous
      </PrevButton>

      <NextButton type="button" onClick={toNextImage}>
        Next
      </NextButton>

      <ImagesWrapper>
        <Image
          src={imageToRender.url}
          alt={imageToRender.alt ?? ''}
        />
      </ImagesWrapper>
    </SlideshowWrapper>
  )
}