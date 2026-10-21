'use client'

import { useState } from 'react'
import styled from 'styled-components'

const SlideshowWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2em auto;
  height: 500px;
  align-items: center;
  background-color: #ddd;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  position: relative;
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
`

interface SlideshowImage {
  url: string
  alt: string
}

interface SlideshowProps {
  images: SlideshowImage[]
}

/**
 * @name Slideshow
 * @desc Display a set of images as a slideshow
 */
const Slideshow = ({ images }: SlideshowProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  const totalImages = images.length

  const toPrevImage = () => {
    if (totalImages === 0) return

    setCurrentImage(current =>
      current === 0 ? totalImages - 1 : current - 1
    )
  }

  const toNextImage = () => {
    if (totalImages === 0) return

    setCurrentImage(current =>
      current === totalImages - 1 ? 0 : current + 1
    )
  }

  const imageToRender = images[currentImage]

  return (
    <SlideshowWrapper>
      <PrevButton
        type="button"
        onClick={toPrevImage}
        disabled={totalImages === 0}
      >
        Previous
      </PrevButton>

      <NextButton
        type="button"
        onClick={toNextImage}
        disabled={totalImages === 0}
      >
        Next
      </NextButton>

      <ImagesWrapper>
        {imageToRender && (
          <Image
            src={imageToRender.url}
            alt={imageToRender.alt}
          />
        )}
      </ImagesWrapper>
    </SlideshowWrapper>
  )
}

export default Slideshow