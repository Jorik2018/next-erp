'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { InputField, InputLabel, InputGroup } from '../Form'
import Card, { Header, Body } from '../Card'
import { LOGIN_PAGE } from '@/lib/constants/endpoints/ui'
import { Button } from '@/lib/ui/button'

interface RegisterFormValues {
  email: string
  username: string
  fname: string
  lname: string
  password: string
  password_confirmation: string
  user_agreement: boolean
}

interface RegisterData {
  register: {
    success: boolean
    err?: {
      message: string
    } | null
  }
}

interface RegisterVariables {
  username: string
  fname: string
  lname?: string
  email: string
  password: string
}

const USER_REGISTRATION_MUTATION = gql`
  mutation Register(
    $username: String!
    $fname: String!
    $lname: String
    $email: String!
    $password: String!
  ) {
    register(
      username: $username
      fname: $fname
      lname: $lname
      email: $email
      password: $password
    ) {
      success
      err {
        message
      }
    }
  }
`

/**
 * @name RegisterForm
 * @desc Form used to register a new user account.
 */
const RegisterForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      username: '',
      fname: '',
      lname: '',
      password: '',
      password_confirmation: '',
      user_agreement: false
    }
  })

  const [registerUser] = useMutation<
    RegisterData,
    RegisterVariables
  >(USER_REGISTRATION_MUTATION)

  const password = watch('password')

  const submitHandler = async ({
    username,
    fname,
    lname,
    email,
    password
  }: RegisterFormValues) => {
    try {
      const { data } = await registerUser({
        variables: {
          username,
          fname,
          lname: lname || undefined,
          email,
          password
        }
      })

      const result = data?.register

      if (!result?.success) {
        alert(
          result?.err?.message ??
            'Unable to create your account.'
        )
        return
      }

      router.push(LOGIN_PAGE)
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Unable to create your account at this time.')
    }
  }

  return (
    <Card
      $small
      $marginTop="5em"
    >
      <Header>
        Enter your information to create an account
      </Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            type="email"
            label="Email"
            {...register('email', {
              required: 'Email is required'
            })}
            error={errors.email?.message}
          />

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
            label="First name"
            {...register('fname', {
              required: 'First name is required'
            })}
            error={errors.fname?.message}
          />

          <InputField
            type="text"
            label="Last name"
            {...register('lname')}
            error={errors.lname?.message}
          />

          <InputField
            type="password"
            label="Password"
            {...register('password', {
              required: 'Password is required'
            })}
            error={errors.password?.message}
          />

          <InputField
            type="password"
            label="Confirm password"
            {...register('password_confirmation', {
              required: 'Please confirm your password',
              validate: value =>
                value === password ||
                'Passwords do not match'
            })}
            error={errors.password_confirmation?.message}
          />

          <InputGroup>
            <input
              id="user_agreement"
              type="checkbox"
              {...register('user_agreement', {
                required:
                  'You must accept the terms of use'
              })}
            />

            <InputLabel htmlFor="user_agreement">
              I accept the terms of use
            </InputLabel>

            {errors.user_agreement && (
              <span className="error">
                {errors.user_agreement.message}
              </span>
            )}
          </InputGroup>

          <Button
            $primary
            $fluidWidth
            $textCenter
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Creating account...'
              : 'Create account'}
          </Button>
        </form>
      </Body>
    </Card>
  )
}

export default RegisterForm