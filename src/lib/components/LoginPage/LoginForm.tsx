'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


import {
  REFRESH_TOKEN,
  ACCESS_TOKEN
} from '../../constants/security'



import { DASHBOARD_PAGE } from '../../constants/endpoints/ui'

import Card, { Header, Body } from '../Card'
import { InputField } from '../Form'
import { Button } from '../Button'
import { hideLoadingModal, showLoadingModal } from '@/lib/slices/mutation-status'
import { showErrorAlert } from '@/lib/slices/error-alert'
import { initializeAuthenticatedUser } from '@/lib/slices/user'

interface LoginFormValues {
  email: string
  password: string
}

interface AuthenticatedUser {
  _id: string
  fname: string
  lname: string
  email: string
}

interface LoginData {
  login: {
    success: boolean
    refreshToken?: string | null
    accessToken?: string | null
    user?: AuthenticatedUser | null
    err?: {
      message: string
    } | null
  }
}

interface LoginVariables {
  email: string
  password: string
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      refreshToken
      accessToken
      user {
        _id
        fname
        lname
        email
      }
      err {
        message
      }
    }
  }
`

/**
 * @name LoginForm
 * @desc Authenticates the user using GraphQL.
 */
const LoginForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [login] = useMutation<
    LoginData,
    LoginVariables
  >(LOGIN_MUTATION)

  const submitHandler = async ({
    email,
    password
  }: LoginFormValues) => {
    dispatch(showLoadingModal())

    try {
      const { data } = await login({
        variables: {
          email,
          password
        }
      })

      const result = data?.login

      if (!result?.success) {
        dispatch(
          showErrorAlert(
            result?.err?.message ??
            'Unable to log in.'
          )
        )

        return
      }

      if (
        !result.accessToken ||
        !result.refreshToken ||
        !result.user
      ) {
        dispatch(
          showErrorAlert(
            'The server returned incomplete authentication data.'
          )
        )

        return
      }

      localStorage.setItem(
        REFRESH_TOKEN,
        result.refreshToken
      )

      localStorage.setItem(
        ACCESS_TOKEN,
        result.accessToken
      )

      dispatch(
        initializeAuthenticatedUser({
          id: result.user._id,
          fname: result.user.fname,
          lname: result.user.lname ?? "",
          email: result.user.email,
        })
      )

      router.push(DASHBOARD_PAGE)
    } catch (error) {
      console.error('Login failed:', error)

      dispatch(
        showErrorAlert(
          'Unable to process your request at this time.'
        )
      )
    } finally {
      dispatch(hideLoadingModal())
    }
  }

  return (
    <Card
      $small
      $marginTop="5em"
    >
      <Header>Sign In</Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            type="email"
            label="Email"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required'
            })}
            error={errors.email?.message}
          />

          <InputField
            type="password"
            label="Password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required'
            })}
            error={errors.password?.message}
          />

          <Button
            $primary
            $fluidWidth
            $textCenter
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Signing in...'
              : 'Sign In'}
          </Button>
        </form>
      </Body>
    </Card>
  )
}

export default LoginForm