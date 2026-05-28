'use client'

import { useState } from 'react'
import styled from 'styled-components'

import { SLIDE_SHOW } from '../../../../constants/post-content/components'
import { CircleButton, Button } from '../../../Button'
import { Header, Body, Footer } from '../../../Card'
import { Form, Input } from '../../../Form'
import { EditablePostComponentProps } from '@/core/types/postComponents'

const ImageUpLoadWrapper = styled.div`
  height: 250px;
  width: 100%;
  margin-bottom: 1em;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`

type SlideImage = {
  id: number
  url: string
  alt: string
}

type SlideshowProps = EditablePostComponentProps<SlideImage[], typeof SLIDE_SHOW>

export default function Slideshow({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: SlideshowProps) {
  const [imageToAddURL, setImageToAddURL] = useState('')
  const [imageToAddALT, setImageToAddALT] = useState('')
  const [images, setImages] = useState<SlideImage[]>([])

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const removeImage = (imageToRemove: SlideImage) => {
    setImages(currentImages =>
      currentImages.filter(image => image.id !== imageToRemove.id),
    )
  }

  const addImage = () => {
    if (!imageToAddURL) return

    setImages(currentImages => [
      ...currentImages,
      {
        id: Date.now(),
        url: imageToAddURL,
        alt: imageToAddALT || imageToAddURL,
      },
    ])

    setImageToAddURL('')
    setImageToAddALT('')
  }

  const addComponentHandler = () => {
    if (images.length < 2) return

    addNewPostComponent?.({
      type: SLIDE_SHOW,
      data: images,
      order,
    })

    hideAddPostComponentModal?.()
  }

  const editComponentHandler = () => {
    if (images.length < 2) return

    editPostComponent?.({
      newData: images,
      type: SLIDE_SHOW,
      order,
    })

    hideEditPostComponentModal?.()
  }

  const submitHandler = useToAddComponent
    ? addComponentHandler
    : editComponentHandler

  return (
    <>
      <Header>สไลด์รูปภาพ</Header>

      <Form
        onSubmit={event => {
          event.preventDefault()
          submitHandler()
        }}
      >
        <Body>
          {images.map(image => (
            <ImageUpLoadWrapper key={image.id}>
              <CircleButton
                $danger
                type="button"
                $position="absolute"
                $top="1em"
                $right="1em"
                onClick={() => removeImage(image)}
              >
                -
              </CircleButton>

              <Button $light type="button">
                เลือกรูปภาพ
              </Button>
            </ImageUpLoadWrapper>
          ))}

          <div>
            <Input
              name="imageToAddURL"
              type="text"
              value={imageToAddURL}
              onChange={event => setImageToAddURL(event.target.value)}
            />

            <Input
              name="imageToAddALT"
              type="text"
              value={imageToAddALT}
              onChange={event => setImageToAddALT(event.target.value)}
            />

            <Button
              $primary
              $fluidWidth
              $textCenter
              type="button"
              $marginTop="1em"
              onClick={addImage}
            >
              เพิ่มรูปภาพ
            </Button>
          </div>
        </Body>

        <Footer>
          <Button $primary $marginRight="0.5em">
            เสร็จสิ้น
          </Button>

          <Button $light type="button" onClick={hideThisModal}>
            ยกเลิก
          </Button>
        </Footer>
      </Form>
    </>
  )
}