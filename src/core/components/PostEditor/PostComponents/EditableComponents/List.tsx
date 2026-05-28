'use client'

import { useState } from 'react'

import { LIST } from '../../../../constants/post-content/components'
import { Form, InputGroup, Input, InputLabel } from '../../../Form'
import { CircleButton, Button } from '../../../Button'
import { Header, Body, Footer } from '../../../Card'
import { EditablePostComponentProps } from '@/core/types/postComponents'

type ListItem = {
  id: string
  data: string
}
type ListData = {
    description: string
    items: string[]
}
type ListProps = EditablePostComponentProps<ListData, typeof LIST> 

export default function List({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: ListProps) {
  const [description, setDescription] = useState('')
  const [itemToAdd, setItemToAdd] = useState('')
  const [items, setItems] = useState<ListItem[]>([])

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const isValid = description.trim() !== '' && items.length > 0

  const addItem = () => {
    const value = itemToAdd.trim()

    if (!value) return

    setItems(currentItems => [
      ...currentItems,
      {
        id: crypto.randomUUID(),
        data: value,
      },
    ])

    setItemToAdd('')
  }

  const removeItem = (itemToRemove: ListItem) => {
    setItems(currentItems =>
      currentItems.filter(item => item.id !== itemToRemove.id),
    )
  }

  const addComponentHandler = () => {
    if (!isValid) return

    addNewPostComponent?.({
      type: LIST,
      data: {
        description,
        items: items.map(item => item.data),
      },
      order,
    })

    hideAddPostComponentModal?.()
  }

  const editComponentHandler = () => {
    if (!isValid) return

    editPostComponent?.({
      type: LIST,
      newData: {
        description,
        items: items.map(item => item.data),
      },
      order,
    })

    hideEditPostComponentModal?.()
  }

  const submitHandler = useToAddComponent
    ? addComponentHandler
    : editComponentHandler

  return (
    <>
      <Header>รายการ</Header>

      <Form
        onSubmit={event => {
          event.preventDefault()
          submitHandler()
        }}
      >
        <Body>
          <InputGroup>
            <InputLabel>รายการนี้เกี่ยวข้องกับอะไร</InputLabel>

            <Input
              type="text"
              name="description"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </InputGroup>

          <ol>
            {items.map(item => (
              <li
                key={item.id}
                style={{
                  position: 'relative',
                  width: '90%',
                  padding: '1.5em',
                }}
              >
                {item.data}

                <CircleButton
                  $danger
                  type="button"
                  $position="absolute"
                  $top="1em"
                  $right="-4em"
                  onClick={() => removeItem(item)}
                >
                  -
                </CircleButton>
              </li>
            ))}

            <Input
              name="itemToAdd"
              value={itemToAdd}
              onChange={event => setItemToAdd(event.target.value)}
            />

            <Button
              $primary
              $textCenter
              type="button"
              $marginTop="1em"
              style={{ width: '90%' }}
              onClick={addItem}
            >
              + เพิ่มรายการ
            </Button>
          </ol>
        </Body>

        <Footer>
          <Button $primary $marginRight="0.5em" disabled={!isValid}>
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