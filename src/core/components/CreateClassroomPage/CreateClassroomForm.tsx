'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { Field, reduxForm, type InjectedFormProps } from 'redux-form'

import { CLASSROOM_PAGE } from '../../constants/endpoints/ui'
import Card, { Header, Body } from '../Card'
import { InputField } from '../Form'
import { Button } from '../Button'

type FormValues = {
  name: string
  subject: string
  description: string
}

type CreateClassroomData = {
  createClassroom: {
    success: boolean
    classroomID?: string
    err?: {
      message?: string
    }
  }
}

type CreateClassroomVariables = FormValues

type Props = InjectedFormProps<FormValues>

const CREATE_CLASSROOM_MUTATION = gql`
  mutation createClassroom(
    $name: String!
    $description: String!
    $subject: String!
  ) {
    createClassroom(
      name: $name
      subject: $subject
      description: $description
    ) {
      success
      classroomID
      err {
        message
      }
    }
  }
`

function CreateClassroomForm({ handleSubmit }: Props) {
  const router = useRouter()

  const [createClassroom, { loading }] = useMutation<
    CreateClassroomData,
    CreateClassroomVariables
  >(CREATE_CLASSROOM_MUTATION)

  const submitHandler = async ({
    name,
    subject,
    description,
  }: FormValues) => {
    try {
      const result = await createClassroom({
        variables: {
          name,
          subject,
          description,
        },
      })

      const classroom = result.data?.createClassroom

      if (classroom?.success && classroom.classroomID) {
        router.push(`${CLASSROOM_PAGE}?id=${classroom.classroomID}`)
        return
      }

      alert(classroom?.err?.message ?? 'failed')
    } catch {
      alert('failed')
    }
  }

  return (
    <Card $small $marginTop="5em">
      <Header>สร้างห้องเรียนใหม่</Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Field
            name="name"
            label="ชื่อห้องเรียน"
            component={InputField}
            type="text"
          />

          <Field
            name="subject"
            label="วิชาที่สอน"
            component={InputField}
            type="text"
          />

          <Field
            name="description"
            label="รายละเอียด"
            component={InputField}
            type="text"
          />

          <Button
            $primary
            $fluidWidth
            $textCenter
            disabled={loading}
          >
            {loading ? 'กำลังสร้าง...' : 'สร้างห้องเรียน'}
          </Button>
        </form>
      </Body>
    </Card>
  )
}

export default reduxForm<FormValues>({
  form: 'create_classroom',
})(CreateClassroomForm)