'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { InputField, InputGroup, InputLabel } from '../Form'
import { LOGIN_PAGE } from '../../constants/endpoints/ui'
import Card, { Header, Body } from '../Card'
import { Button } from '../Button'

type RegisterFormValues = {
  email: string
  username: string
  fname: string
  lname?: string
  password: string
  password_confirmation: string
  user_agreement: boolean
}

type RegisterData = {
  register: {
    success: boolean
    err?: {
      message?: string
    }
  }
}

type RegisterVariables = {
  username: string
  fname: string
  lname?: string
  email: string
  password: string
}

const USER_REGISTRATION_MUTATION = gql`
  mutation register(
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

export default function RegisterForm() {
  const router = useRouter()

  const { register, handleSubmit } = useForm<RegisterFormValues>()

  const [registerUser, { loading }] = useMutation<
    RegisterData,
    RegisterVariables
  >(USER_REGISTRATION_MUTATION)

  const submitHandler = async (values: RegisterFormValues) => {
    if (values.password !== values.password_confirmation) {
      alert('Please confirm your password')
      return
    }

    try {
      const result = await registerUser({
        variables: {
          username: values.username,
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          password: values.password,
        },
      })

      const success = result.data?.register.success

      if (success) {
        router.push(LOGIN_PAGE)
      } else {
        alert(result.data?.register.err?.message ?? 'failed')
      }
    } catch {
      alert('failed')
    }
  }

  return (
    <Card $small $marginTop="5em">
      <Header>กรอกข้อมูลเล็กน้อยเพื่อสมัครสมาชิก</Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            label="อีเมลล์"
            type="email"
            {...register('email')}
          />

          <InputField
            label="ชื่อผู้ใช้ในระบบ(username)"
            type="text"
            {...register('username')}
          />

          <InputField
            label="ชื่อจริง"
            type="text"
            {...register('fname')}
          />

          <InputField
            label="นามสกุล"
            type="text"
            {...register('lname')}
          />

          <InputField
            label="พาสเวิร์ด"
            type="password"
            {...register('password')}
          />

          <InputField
            label="ยืนยันพาสเวิร์ดอีกครั้ง"
            type="password"
            {...register('password_confirmation')}
          />

          <InputGroup>
            <input
              id="user_agreement"
              type="checkbox"
              {...register('user_agreement')}
            />

            <InputLabel htmlFor="user_agreement">
              ข้าพเจ้ายอมรับเงื่อนไขในการใข้งาน
            </InputLabel>
          </InputGroup>

          <Button
            $primary
            $fluidWidth
            $textCenter
            disabled={loading}
          >
            {loading ? 'กำลังส่ง...' : 'ยืนยัน'}
          </Button>
        </form>
      </Body>
    </Card>
  )
}