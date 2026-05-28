'use client'

import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import { IMAGE } from '../../../../constants/post-content/components'
import { Header, Body, Footer } from '../../../Card'
import { Form, InputField } from '../../../Form'
import { Button } from '../../../Button'
import { EditablePostComponentProps } from '@/core/types/postComponents'

const ImageUpLoadWrapper = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`

type ImageFormValues = {
  image_url: string
  image_alt?: string
}

type ImageData = {
  url: string
  alt: string
}

type ImageProps = EditablePostComponentProps<ImageData, typeof IMAGE>

export default function Image({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: ImageProps) {
  const { register, handleSubmit } = useForm<ImageFormValues>()

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const submitHandler = ({ image_url, image_alt }: ImageFormValues) => {
    if (!image_url) return

    if (useToAddComponent) {
      addNewPostComponent?.({
        data: {
          url: image_url,
          alt: image_alt || image_url,
        },
        type: IMAGE,
        order,
      })

      hideAddPostComponentModal?.()
      return
    }

    editPostComponent?.({
      newData: {
        url: image_url,
        alt: image_alt || image_url,
      },
      type: IMAGE,
      order,
    })

    hideEditPostComponentModal?.()
  }

  return (
    <>
      <Header>รูปภาพ</Header>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Body>
          <ImageUpLoadWrapper>
            <Button $light type="button">
              เลือกรูปภาพ
            </Button>
          </ImageUpLoadWrapper>

          <InputField type="text" {...register('image_url')} />

          <InputField type="text" {...register('image_alt')} />
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