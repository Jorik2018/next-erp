'use client'

import { useForm } from 'react-hook-form'

import { InputField, TextAreaField } from '../../Form'
import Card, { Header, Body } from '../Card'
import { Button } from '../Button'

interface EditClassroomFormValues {
  name: string
  description: string
}

/**
 * @name EditClassroomForm
 * @desc Form used to edit classroom information.
 */
const EditClassroomForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<EditClassroomFormValues>({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const submitHandler = (
    values: EditClassroomFormValues
  ) => {
    console.table(values)
  }

  return (
    <Card
      $small
      $marginTop="5em"
    >
      <Header>Edit Classroom Information</Header>

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

          <TextAreaField
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />

          <Button
            $primary
            $fluidWidth
            $textCenter
            type="submit"
            disabled={isSubmitting}
          >
            Save Changes
          </Button>
        </form>
      </Body>
    </Card>
  )
}

export default EditClassroomForm