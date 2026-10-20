'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { CLASSROOM_PAGE } from '../../constants/endpoints/ui'
import Card, { Header, Body } from '../Card'
import { InputField } from '../Form'
import { Button } from '../Button'

interface CreateClassroomFormValues {
  name: string
  subject: string
  description: string
}

interface CreateClassroomData {
  createClassroom: {
    success: boolean
    classroomID?: string | null
    err?: {
      message: string
    } | null
  }
}

interface CreateClassroomVariables {
  name: string
  subject: string
  description: string
}

const CREATE_CLASSROOM_MUTATION = gql`
  mutation CreateClassroom(
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

/**
 * @name CreateClassroomForm
 * @desc Form used to create a new classroom.
 */
const CreateClassroomForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<CreateClassroomFormValues>({
    defaultValues: {
      name: '',
      subject: '',
      description: ''
    }
  })

  const [createClassroom] = useMutation<
    CreateClassroomData,
    CreateClassroomVariables
  >(CREATE_CLASSROOM_MUTATION)

  const submitHandler = async ({
    name,
    subject,
    description
  }: CreateClassroomFormValues) => {
    try {
      const { data } = await createClassroom({
        variables: {
          name,
          subject,
          description
        }
      })

      const result = data?.createClassroom

      if (!result?.success || !result.classroomID) {
        alert(
          result?.err?.message ??
            'Unable to create the classroom.'
        )
        return
      }

      router.push(
        `${CLASSROOM_PAGE}?id=${result.classroomID}`
      )
    } catch (error) {
      console.error(
        'Unable to create classroom:',
        error
      )

      alert(
        'Unable to create the classroom at this time.'
      )
    }
  }

  return (
    <Card
      $small
      $marginTop="5em"
    >
      <Header>Create a New Classroom</Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            type="text"
            label="Classroom Name"
            {...register('name', {
              required: 'Classroom name is required'
            })}
            error={errors.name?.message}
          />

          <InputField
            type="text"
            label="Subject"
            {...register('subject', {
              required: 'Subject is required'
            })}
            error={errors.subject?.message}
          />

          <InputField
            type="text"
            label="Description"
            {...register('description', {
              required: 'Description is required'
            })}
            error={errors.description?.message}
          />

          <Button
            $primary
            $fluidWidth
            $textCenter
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Creating...'
              : 'Create Classroom'}
          </Button>
        </form>
      </Body>
    </Card>
  )
}

export default CreateClassroomForm