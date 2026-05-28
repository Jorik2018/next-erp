'use client'

import { useForm } from 'react-hook-form'

import { VIDEO } from '../../../../constants/post-content/components'
import { Header, Body, Footer } from '../../../Card'
import { Form, InputField } from '../../../Form'
import { Button } from '../../../Button'
import { EditablePostComponentProps } from '@/core/types/postComponents'

type VideoFormValues = {
  video_url: string
}

type VideoProps = EditablePostComponentProps<{ url: string }, typeof VIDEO>

export default function Video({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: VideoProps) {
  const { register, handleSubmit } = useForm<VideoFormValues>()

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const submitHandler = ({ video_url }: VideoFormValues) => {
    if (!video_url) return

    if (useToAddComponent) {
      addNewPostComponent?.({
        data: { url: video_url },
        type: VIDEO,
        order,
      })

      hideAddPostComponentModal?.()
      return
    }

    editPostComponent?.({
      newData: { url: video_url },
      type: VIDEO,
      order,
    })

    hideEditPostComponentModal?.()
  }

  return (
    <>
      <Header>วิดีโอ</Header>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Body>
          <InputField type="text" {...register('video_url')} />
        </Body>

        <Footer>
          <Button $success $marginRight="0.5em">
            เสร็จสิ้น
          </Button>

          <Button $danger type="button" onClick={hideThisModal}>
            ยกเลิก
          </Button>
        </Footer>
      </Form>
    </>
  )
}