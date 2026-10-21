'use client'

import { FormEvent, useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import { ModalBackground, ModalPanel } from './Modal'
import { Header, Body, Footer } from './Card'
import { Button } from './Button'
import { InputGroup } from './Form'

const INVITE_USER_MUTATION = gql`
  mutation inviteUser(
    $candidateIdent: String!
    $classroomID: String!
  ) {
    inviteUser(
      candidateIdent: $candidateIdent
      classroomID: $classroomID
    ) {
      success
      err {
        message
      }
    }
  }
`

interface InviteUserData {
  inviteUser: {
    success: boolean
    err?: {
      message?: string | null
    } | null
  }
}

interface InviteUserVariables {
  candidateIdent: string
  classroomID: string
}

interface ClassroomInvitationModalProps {
  isShowing: boolean
  hideClassroomInvitationModal: () => void
  classroomID: string
}

const ClassroomInvitationModal = ({
  isShowing,
  hideClassroomInvitationModal,
  classroomID
}: ClassroomInvitationModalProps) => {
  const [candidateIdent, setCandidateIdent] = useState('')

  const [inviteUser, { loading }] = useMutation<
    InviteUserData,
    InviteUserVariables
  >(INVITE_USER_MUTATION)

  const submitHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const candidate = candidateIdent.trim()

    if (!candidate) {
      alert('Please enter an email address or username.')
      return
    }

    try {
      const { data } = await inviteUser({
        variables: {
          candidateIdent: candidate,
          classroomID
        }
      })

      if (data?.inviteUser.success) {
        alert('Invitation sent successfully.')

        setCandidateIdent('')
        hideClassroomInvitationModal()
        return
      }

      const message =
        data?.inviteUser.err?.message ??
        'Unable to send the invitation.'

      alert(message)
    } catch (error) {
      console.error('Failed to send classroom invitation:', error)
      alert('An unexpected error occurred while sending the invitation.')
    }
  }

  return (
    <ModalBackground $show={isShowing}>
      <ModalPanel $large>
        <Header>Invite a New Member</Header>

        <Body>
          <form
            id="classroom-invitation-form"
            onSubmit={submitHandler}
          >
            <InputGroup>
              <label htmlFor="candidateIdent">
                Email or username
              </label>

              <input
                id="candidateIdent"
                name="candidateIdent"
                type="text"
                value={candidateIdent}
                onChange={(event) =>
                  setCandidateIdent(event.target.value)
                }
                placeholder="Enter an email address or username"
                autoComplete="off"
                disabled={loading}
              />
            </InputGroup>
          </form>
        </Body>

        <Footer>
          <Button
            $primary
            type="submit"
            form="classroom-invitation-form"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Invitation'}
          </Button>

          <Button
            $light
            type="button"
            onClick={hideClassroomInvitationModal}
            disabled={loading}
          >
            Close
          </Button>
        </Footer>
      </ModalPanel>
    </ModalBackground>
  )
}

export default ClassroomInvitationModal