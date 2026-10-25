'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'


import { AuthenticatedUser } from '@/lib/types/user'
import { PROFILE_PAGE } from '@/lib/constants/endpoints/ui'
import Card, { Body, Header } from '../Card'
import { InputField } from '../Form'
import { Button } from '@/lib/ui/button'

interface RootState {
  user: AuthenticatedUser
}

interface EditProfileFormValues {
  username: string
  fname: string
  lname: string
  career: string
  address: string
}

interface EditProfileData {
  editProfile: {
    success: boolean
    err?: {
      message: string
    } | null
  }
}

interface EditProfileVariables {
  username?: string
  fname?: string
  lname?: string
  career?: string
  address?: string
}

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile(
    $lname: String
    $fname: String
    $career: String
    $address: String
    $username: String
  ) {
    editProfile(
      fname: $fname
      lname: $lname
      career: $career
      address: $address
      username: $username
    ) {
      success
      err {
        message
      }
    }
  }
`

/**
 * @name EditProfileForm
 * @desc Form used to edit the current user's profile.
 */
const EditProfileForm = () => {
  const router = useRouter()

  const activeUser = useSelector(
    (state: RootState) => state.user
  )

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      username: activeUser?.username ?? '',
      fname: activeUser?.fname ?? '',
      lname: activeUser?.lname ?? '',
      career: activeUser?.career ?? '',
      address: activeUser?.address ?? ''
    }
  })

  const [editProfile] = useMutation<
    EditProfileData,
    EditProfileVariables
  >(EDIT_PROFILE_MUTATION)

  const submitHandler = async (
    values: EditProfileFormValues
  ) => {
    try {
      const { data } = await editProfile({
        variables: {
          username: values.username,
          fname: values.fname,
          lname: values.lname,
          career: values.career,
          address: values.address
        }
      })

      const result = data?.editProfile

      if (!result?.success) {
        alert(
          result?.err?.message ??
            'Unable to update your profile.'
        )
        return
      }

      router.push(
        `${PROFILE_PAGE}?id=${activeUser.id}`
      )
    } catch (error) {
      console.error(
        'Unable to update profile:',
        error
      )

      alert(
        'Unable to update your profile at this time.'
      )
    }
  }

  return (
    <Card
      $small
      $marginTop="5em"
    >
      <Header>Edit Profile</Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            type="text"
            label="Username"
            {...register('username', {
              required: 'Username is required'
            })}
            error={errors.username?.message}
          />

          <InputField
            type="text"
            label="First Name"
            {...register('fname')}
            error={errors.fname?.message}
          />

          <InputField
            type="text"
            label="Last Name"
            {...register('lname')}
            error={errors.lname?.message}
          />

          <InputField
            type="text"
            label="Career"
            {...register('career')}
            error={errors.career?.message}
          />

          <InputField
            type="text"
            label="Address"
            {...register('address')}
            error={errors.address?.message}
          />

          <Button
            $primary
            $fluidWidth
            $textCenter
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving...'
              : 'Save Changes'}
          </Button>
        </form>
      </Body>
    </Card>
  )
}

export default EditProfileForm