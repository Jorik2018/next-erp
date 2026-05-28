'use client'

import { useForm } from 'react-hook-form'

import { MAP } from '../../../../constants/post-content/components'
import { Header, Body, Footer } from '../../../Card'
import { Form, InputField } from '../../../Form'
import { Button } from '../../../Button'
import { EditablePostComponentProps } from '@/core/types/postComponents'

type MapFormValues = {
  location: string
}

type MapProps = EditablePostComponentProps<MapFormValues, typeof MAP>

export default function Map({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: MapProps) {
  const { register, handleSubmit } = useForm<MapFormValues>()

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const submitHandler = ({ location }: MapFormValues) => {
    if (!location && location !== '') return

    if (useToAddComponent) {
      addNewPostComponent?.({
        data: { location },
        type: MAP,
        order,
      })

      hideAddPostComponentModal?.()
      return
    }

    editPostComponent?.({
      newData: { location },
      type: MAP,
      order,
    })

    hideEditPostComponentModal?.()
  }

  return (
    <>
      <Header>แผนที่</Header>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Body>
          <InputField type="text" {...register('location')} />
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