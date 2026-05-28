'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { showLoadingModal, hideLoadingModal } from '../../slices/mutation-status'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../../constants/security'
import { initializeAuthenticatedUser } from '../../slices/user'
import { showErrorAlert } from '../../slices/error-alert'
import { DASHBOARD_PAGE } from '../../constants/endpoints/ui'

import Card, { Header, Body } from '../Card'
import { InputField } from '../Form'
import { Button } from '../Button'

type LoginFormValues = {
  email: string
  password: string
}

type LoginData = {
  login: {
    success: boolean
    refreshToken?: string
    accessToken?: string
    user?: {
      _id: string
      fname: string
      lname: string
      email: string
    }
    err?: {
      message?: string
    }
  }
}

type LoginVariables = LoginFormValues

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
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

export default function LoginForm() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm<LoginFormValues>()

  const [login] = useMutation<LoginData, LoginVariables>(LOGIN_MUTATION)

  const submitHandler = async ({ email, password }: LoginFormValues) => {
    dispatch(showLoadingModal())

    try {
      const result = await login({
        variables: {
          email,
          password,
        },
      })

      const response = result.data?.login

      if (response?.success && response.refreshToken && response.accessToken && response.user) {
        localStorage.setItem(REFRESH_TOKEN, response.refreshToken)
        localStorage.setItem(ACCESS_TOKEN, response.accessToken)

        dispatch(initializeAuthenticatedUser(response.user))

        router.push(DASHBOARD_PAGE)
      } else {
        dispatch(showErrorAlert(response?.err?.message ?? 'ไม่สามารถเข้าสู่ระบบได้'))
      }
    } catch {
      dispatch(showErrorAlert('ไม่สามารถดำเนินการได้ในขณะนี้'))
    } finally {
      dispatch(hideLoadingModal())
    }
  }

  return (
    <Card $small $marginTop="5em">
      <Header>ยืนยันตัวตนเพื่อเข้าสู่ระบบ</Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            required
            label="อีเมลล์"
            type="email"
            {...register('email', { required: true })}
          />

          <InputField
            required
            label="พาสเวิร์ด"
            type="password"
            {...register('password', { required: true })}
          />

          <Button $primary $fluidWidth $textCenter>
            เข้าสู่ระบบ
          </Button>
        </form>
      </Body>
    </Card>
  )
}