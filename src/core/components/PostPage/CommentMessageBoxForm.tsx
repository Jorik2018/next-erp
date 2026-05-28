'use client'

import { Form, TextArea } from '../Form'
import { Button } from '../Button'

export default function CommentMessageForm() {
  return (
    <Form>
      <TextArea
        style={{
          marginBottom: '1em',
          width: '100%',
          height: '100px',
        }}
      />

      <Button $primary $textCenter $fluidWidth>
        ส่ง
      </Button>
    </Form>
  )
}