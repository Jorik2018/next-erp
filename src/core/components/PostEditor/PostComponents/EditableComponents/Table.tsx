'use client'

import { useState } from 'react'

import { TABLE } from '../../../../constants/post-content/components'
import TableWrapper from '../../../PostPage/RenderedComponents/Table'
import { Button, CircleButton } from '../../../Button'
import { Header, Body, Footer } from '../../../Card'
import { Form, Input, InputLabel, InputGroup } from '../../../Form'
import { EditablePostComponentProps } from '@/core/types/postComponents'

type TableRowItem = {
  data: string
  column: string
}

type TableRow = {
  id: number
  items: TableRowItem[]
}

type TableData = {
  meta: {
    name: string
    description: string
  }
  head: string[]
  body: TableRow[]
};

type TableProps = EditablePostComponentProps<TableData, typeof TABLE>

export default function Table({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: TableProps) {
  const [description, setDescription] = useState('')
  const [columnToAdd, setColumnToAdd] = useState('')
  const [name, setName] = useState('')
  const [head, setHead] = useState<string[]>([])
  const [body, setBody] = useState<TableRow[]>([])
  const [rowInputs, setRowInputs] = useState<Record<string, string>>({})

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal

  const canSubmit = head.length > 0 && body.length > 0

  const buildTableData = () => ({
    meta: {
      name,
      description,
    },
    head,
    body,
  })

  const addComponentHandler = () => {
    if (!canSubmit || !addNewPostComponent) {
      return
    }

    addNewPostComponent({
      type: TABLE,
      order,
      data: buildTableData(),
    })

    hideAddPostComponentModal?.()
  }

  const editComponentHandler = () => {
    if (!canSubmit || !editPostComponent) {
      return
    }

    editPostComponent({
      type: TABLE,
      order,
      newData: buildTableData(),
    })

    hideEditPostComponentModal?.()
  }

  const submitHandler = useToAddComponent
    ? addComponentHandler
    : editComponentHandler

  const addColumnItem = () => {
    const nextColumn = columnToAdd.trim()

    if (!nextColumn || head.includes(nextColumn)) {
      return
    }

    setHead(currentHead => [...currentHead, nextColumn])
    setColumnToAdd('')
  }

  const addRowItem = () => {
    if (!head.length) {
      return
    }

    const itemsToAdd = head.map(column => ({
      data: rowInputs[column] ?? '',
      column,
    }))

    setBody(currentBody => [
      ...currentBody,
      {
        id: Date.now(),
        items: itemsToAdd,
      },
    ])

    setRowInputs({})
  }

  const removeRowItem = (rowToRemove: number) => {
    setBody(currentBody =>
      currentBody.filter(rowItem => rowItem.id !== rowToRemove),
    )
  }

  return (
    <>
      <Header>ตาราง</Header>

      <Form
        onSubmit={event => {
          event.preventDefault()
          submitHandler()
        }}
      >
        <Body>
          <InputGroup>
            <InputLabel>ชื่อตารางนี้</InputLabel>
            <Input
              name="name"
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>คำอธิบายเกี่ยวกับตารางนี้</InputLabel>
            <Input
              name="description"
              type="text"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </InputGroup>

          <TableWrapper description={description} name={name}>
            <thead>
              <tr>
                <th>ลำดับ</th>

                {head.map(column => (
                  <th key={column}>{column}</th>
                ))}

                <th>
                  <Input
                    type="text"
                    name="newColumn"
                    value={columnToAdd}
                    placeholder="พิมพ์ชื่อคอลัมน์ที่ต้องการจะเพิ่มที่นี่"
                    onChange={event => setColumnToAdd(event.target.value)}
                  />
                </th>

                <th>
                  <CircleButton $primary type="button" onClick={addColumnItem}>
                    +
                  </CircleButton>
                </th>
              </tr>
            </thead>

            <tbody>
              {body.map((rowItem, index) => (
                <tr key={rowItem.id}>
                  <td>{index + 1}</td>

                  {rowItem.items.map(row => (
                    <td key={`${rowItem.id}-${row.column}`}>{row.data}</td>
                  ))}

                  <td>
                    <CircleButton
                      $danger
                      type="button"
                      onClick={() => removeRowItem(rowItem.id)}
                    >
                      -
                    </CircleButton>
                  </td>
                </tr>
              ))}

              {head.length > 0 && (
                <tr>
                  <td />

                  {head.map(column => (
                    <td key={column}>
                      <Input
                        type="text"
                        name={column}
                        value={rowInputs[column] ?? ''}
                        onChange={event =>
                          setRowInputs(currentInputs => ({
                            ...currentInputs,
                            [column]: event.target.value,
                          }))
                        }
                      />
                    </td>
                  ))}

                  <td />
                  <td>
                    <CircleButton $primary type="button" onClick={addRowItem}>
                      +
                    </CircleButton>
                  </td>
                </tr>
              )}
            </tbody>
          </TableWrapper>
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