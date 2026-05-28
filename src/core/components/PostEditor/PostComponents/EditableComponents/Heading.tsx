'use client'

import { useForm } from 'react-hook-form'

import { HEADING } from '../../../../constants/post-content/components'
import { Header, Body, Footer } from '../../../Card'
import { Form, InputField } from '../../../Form'
import { Button } from '../../../Button'
import { EditablePostComponentProps } from '@/core/types/postComponents'

type HeadingFormValues = {
  heading_text: string
}

type HeadingProps = EditablePostComponentProps<string, typeof HEADING>

export default function Heading({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: HeadingProps) {
  const { register, handleSubmit } = useForm<HeadingFormValues>()

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const submitHandler = ({ heading_text }: HeadingFormValues) => {
    if (!heading_text && heading_text !== '') return

    if (useToAddComponent) {
      addNewPostComponent?.({
        data: heading_text,
        type: HEADING,
        order,
      })

      hideAddPostComponentModal?.()
      return
    }

    editPostComponent?.({
      newData: heading_text,
      type: HEADING,
      order,
    })

    hideEditPostComponentModal?.()
  }

  return (
    <>
      <Header>หัวข้อเรื่อง</Header>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Body>
          <InputField
            type="text"
            {...register('heading_text')}
          />
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