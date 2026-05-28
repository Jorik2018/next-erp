'use client'

import { useForm } from 'react-hook-form'

import { PARAGRAPH } from '../../../../constants/post-content/components'
import { Header, Body, Footer } from '../../../Card'
import { Form, TextAreaField } from '../../../Form'
import { Button } from '../../../Button'
import { EditablePostComponentProps } from '@/core/types/postComponents'

type ParagraphFormValues = {
  paragraph_text: string
}

type ParagraphProps = EditablePostComponentProps<string, typeof PARAGRAPH>

export default function Paragraph({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: ParagraphProps) {
  const { register, handleSubmit } = useForm<ParagraphFormValues>()

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const onSubmit = ({ paragraph_text }: ParagraphFormValues) => {
    if (!paragraph_text && paragraph_text !== '') return

    if (useToAddComponent) {
      addNewPostComponent?.({
        data: paragraph_text,
        type: PARAGRAPH,
        order,
      })

      hideAddPostComponentModal?.()
      return
    }

    editPostComponent?.({
      newData: paragraph_text,
      type: PARAGRAPH,
      order,
    })

    hideEditPostComponentModal?.()
  }

  return (
    <>
      <Header>ย่อหน้า</Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <TextAreaField
            {...register('paragraph_text')}
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