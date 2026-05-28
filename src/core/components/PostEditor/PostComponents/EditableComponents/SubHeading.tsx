'use client'

import { useForm } from 'react-hook-form'

import { SUB_HEADING } from '../../../../constants/post-content/components'
import { Header, Body, Footer } from '../../../Card'
import { Form, InputField } from '../../../Form'
import { Button } from '../../../Button'
import { EditablePostComponentProps } from '@/core/types/postComponents'

type SubHeadingFormValues = {
  sub_heading_text: string
}

type SubHeadingProps = EditablePostComponentProps<string, typeof SUB_HEADING>

export default function SubHeading({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: SubHeadingProps) {
  const { register, handleSubmit } = useForm<SubHeadingFormValues>()

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const submitHandler = ({ sub_heading_text }: SubHeadingFormValues) => {
    if (!sub_heading_text && sub_heading_text !== '') return

    if (useToAddComponent) {
      addNewPostComponent?.({
        data: sub_heading_text,
        type: SUB_HEADING,
        order,
      })

      hideAddPostComponentModal?.()
      return
    }

    editPostComponent?.({
      newData: sub_heading_text,
      type: SUB_HEADING,
      order,
    })

    hideEditPostComponentModal?.()
  }

  return (
    <>
      <Header>หัวข้อย่อย</Header>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Body>
          <InputField
            type="text"
            {...register('sub_heading_text')}
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