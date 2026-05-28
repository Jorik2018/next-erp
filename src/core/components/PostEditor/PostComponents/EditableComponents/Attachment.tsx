'use client'

import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import { ATTACHMENT } from '../../../../constants/post-content/components'
import { Header, Body, Footer } from '../../../Card'
import { Form, InputField } from '../../../Form'
import { Button } from '../../../Button'
import { EditablePostComponentProps } from '@/core/types/postComponents'

const AttachmentUpLoadWrapper = styled.div`
  height: 250px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ddd;
`

type AttachmentFormValues = {
  filename: string
}

type AttachmentData = {
  filename: string
  type: string
  size: string
}

type AttachmentProps = EditablePostComponentProps<AttachmentData, typeof ATTACHMENT>

export default function Attachment({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: AttachmentProps) {
  const { register, handleSubmit } = useForm<AttachmentFormValues>()

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const submitHandler = ({ filename }: AttachmentFormValues) => {
    if (!filename) return

    if (useToAddComponent) {
      addNewPostComponent?.({
        data: { filename, type: 'PDF', size: '100' },
        type: ATTACHMENT,
        order,
      })

      hideAddPostComponentModal?.()
      return
    }

    editPostComponent?.({
      newData: { filename, type: 'PDF', size: '100' },
      type: ATTACHMENT,
      order,
    })

    hideEditPostComponentModal?.()
  }

  return (
    <>
      <Header>ไฟล์แนบ</Header>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Body>
          <AttachmentUpLoadWrapper>
            <Button $light type="button">
              เลือกไฟล์
            </Button>
          </AttachmentUpLoadWrapper>
          {/**
showSearchPanel
Property 'label' is missing in type '{ onChange: ChangeHandler; onBlur: ChangeHandler; ref: RefCallBack; name: "filename"; min?: string | number | undefined; max?: string | number | undefined; ... 5 more ...; type: "text"; }' but required in type '{ label: string; error?: string | undefined; $inline?: boolean | undefined; }' */}
          <InputField type="text" {...register('filename')} />
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