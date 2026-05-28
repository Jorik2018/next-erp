'use client'

import { useRef } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { Field, reduxForm, type InjectedFormProps } from 'redux-form'

import { InputField, InputGroup } from './Form'
import { ModalBackground, ModalPanel } from './Modal'
import { Header, Body, Footer } from './Card'
import { Button } from './Button'

type FormValues = {
  candidateIdent: string
}

type InviteUserData = {
  inviteUser: {
    success: boolean
    err?: {
      message?: string
    }
  }
}

type InviteUserVariables = {
  candidateIdent: string
  classroomID: string
}

type OwnProps = {
  hideClassroomInvitationModal: () => void
  classroomID: string
  isShowing: boolean
}

type Props = OwnProps & InjectedFormProps<FormValues, OwnProps>

const INVITE_USER_MUTATION = gql`
  mutation inviteUser($candidateIdent: String!, $classroomID: String!) {
    inviteUser(candidateIdent: $candidateIdent, classroomID: $classroomID) {
      success
      err {
        message
      }
    }
  }
`

function ClassroomInvitationModal({
  isShowing,
  hideClassroomInvitationModal,
  classroomID,
  handleSubmit,
}: Props) {
  const submitButtonRef = useRef<HTMLInputElement>(null)

  const [inviteUser, { loading }] = useMutation<
    InviteUserData,
    InviteUserVariables
  >(INVITE_USER_MUTATION)

  const submitHandler = async ({ candidateIdent }: FormValues) => {
    try {
      const result = await inviteUser({
        variables: {
          candidateIdent,
          classroomID,
        },
      })

      const success = result.data?.inviteUser.success

      alert(success ? 'Done' : 'Failed')
    } catch {
      alert('Failed')
    }
  }

  return (
    <ModalBackground $show={isShowing}>
      <ModalPanel $large>
        <Header>เพิ่มสมาชิกใหม่</Header>

        <Body>
          <form onSubmit={handleSubmit(submitHandler)}>
            <InputGroup>
              <Field
                type="text"
                name="candidateIdent"
                component={InputField}
                label="อีเมลล์ หรือ username ของผู้ใช้งานที่ท่านต้องการเชิญเข้าห้องเรียนนี้"
              />
            </InputGroup>

            <input
              ref={submitButtonRef}
              type="submit"
              style={{ display: 'none' }}
            />
          </form>
        </Body>

        <Footer>
          <Button
            $primary
            disabled={loading}
            onClick={() => submitButtonRef.current?.click()}
          >
            {loading ? 'กำลังส่ง...' : 'ส่งคำเชิญ'}
          </Button>

          <Button $light onClick={hideClassroomInvitationModal}>
            ปิด
          </Button>
        </Footer>
      </ModalPanel>
    </ModalBackground>
  )
}

export default reduxForm<FormValues, OwnProps>({
  form: 'classroom_member_invitation',
})(ClassroomInvitationModal)