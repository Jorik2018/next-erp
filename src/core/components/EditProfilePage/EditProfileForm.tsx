'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { PROFILE_PAGE } from '../../constants/endpoints/ui'
import Card, { Header, Body } from '../Card'
import { InputField } from '../Form'
import { Button } from '../Button'

type EditProfileFormValues = {
  username?: string
  fname?: string
  lname?: string
  career?: string
  address?: string
}

type EditProfileData = {
  editProfile: {
    success: boolean
    err?: {
      message?: string
    }
  }
}

type ActiveUser = {
  _id: string
}

type RootState = {
  user: ActiveUser
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
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

export default function EditProfileForm() {
  const router = useRouter()
  const activeUser = useSelector((state: RootState) => state.user)

  const { register, handleSubmit } = useForm<EditProfileFormValues>()

  const [editProfile, { loading }] = useMutation<
    EditProfileData,
    EditProfileFormValues
  >(EDIT_PROFILE_MUTATION)

  const submitHandler = async (values: EditProfileFormValues) => {
    try {
      const result = await editProfile({
        variables: values,
      })

      const success = result.data?.editProfile.success

      if (success) {
        router.push(`${PROFILE_PAGE}?id=${activeUser._id}`)
      } else {
        alert(result.data?.editProfile.err?.message ?? 'failed')
      }
    } catch {
      alert('failed')
    }
  }

  return (
    <Card $small $marginTop="5em">
      <Header>แก้ไขข้อมูลส่วนตัว</Header>

      <Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            type="text"
            label="ชื่อผู้ใช้งาน"
            {...register('username')}
          />

          <InputField
            type="text"
            label="ชื่อจริง"
            {...register('fname')}
          />

          <InputField
            type="text"
            label="นามสกุล"
            {...register('lname')}
          />

          <InputField
            type="text"
            label="อาชีพ"
            {...register('career')}
          />

          <InputField
            type="text"
            label="ที่อยู่"
            {...register('address')}
          />

          <Button $primary $fluidWidth $textCenter disabled={loading}>
            {loading ? 'กำลังบันทึก...' : 'เรียบร้อย'}
          </Button>
        </form>
      </Body>
    </Card>
  )
}