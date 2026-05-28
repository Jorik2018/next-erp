'use client'

import { useForm } from 'react-hook-form'

import { InputField, TextAreaField } from '../Form'
import Card, { Header, Body } from '../Card'
import { Button } from '../Button'

type EditClassroomFormValues = {
  email: string
  career: string
}

export default function EditClassroomForm() {
  const { register, handleSubmit } = useForm<EditClassroomFormValues>()

  const submitHandler = (values: EditClassroomFormValues) => {
    console.table(values)
  }

  return (
    <Card $small $marginTop="5em">
      <Header>แก้ไขข้อมูลห้องเรียน</Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/** Type '{ onChange: ChangeHandler; onBlur: ChangeHandler; ref: RefCallBack; name: "email"; min?: string | number | undefined; max?: string | number | undefined; ... 6 more ...; type: string; }' is missing the following properties from type 'InputFieldProps': input, meta*/}
          <InputField
            label="ชื่อห้องเรียน"
            type="text"
            {...register('email')}
          />

          <TextAreaField
            label="คำอธิบาย"
            {...register('career')}
          />

          <Button $primary $fluidWidth $textCenter>
            เรียบร้อย
          </Button>
        </form>
      </Body>
    </Card>
  )
}