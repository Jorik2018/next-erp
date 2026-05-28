'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'

import { DASHBOARD_PAGE } from '../../constants/endpoints/ui'
import { ModalBackground, ModalPanel } from '../Modal'
import { Header, Body, Footer } from '../Card'
import { Button } from '../Button'

type PostRemovalConfirmationModalProps = {
  isPostRMModalShowing: boolean
  hidePostRMModal: () => void
  postID: string
}

type RemovePostData = {
  removePost: {
    success: boolean
    err?: {
      message?: string
    }
  }
}

type RemovePostVariables = {
  postID: string
}

const REMOVE_POST_MUTATION = gql`
  mutation removePost($postID: String!) {
    removePost(postID: $postID) {
      success
      err {
        message
      }
    }
  }
`

export default function PostRemovalConfirmationModal({
  isPostRMModalShowing,
  hidePostRMModal,
  postID,
}: PostRemovalConfirmationModalProps) {
  const router = useRouter()

  const [removePostMutation, { loading }] = useMutation<
    RemovePostData,
    RemovePostVariables
  >(REMOVE_POST_MUTATION)

  const removePost = async () => {
    try {
      const result = await removePostMutation({
        variables: { postID },
      })

      const success = result.data?.removePost.success
      const errorMessage = result.data?.removePost.err?.message

      hidePostRMModal()

      if (success) {
        router.push(DASHBOARD_PAGE)
        return
      }

      alert(errorMessage ?? 'Failed to remove post')
    } catch (error) {
      hidePostRMModal()
      alert(error instanceof Error ? error.message : 'Failed to remove post')
    }
  }

  return (
    <ModalBackground $show={isPostRMModalShowing}>
      <ModalPanel $large>
        <Header>ยืนยันการดำเนินการ</Header>

        <Body style={{ color: '#777', fontSize: '1em', textAlign: 'center' }}>
          การดำเนินการนี้ไม่สามารถย้อนกลับได้
          และคุณจะสูญเสียข้อมูลทั้งหมดของโพสนี้ คุณต้องการดำเนินการต่อหรือไม่
        </Body>

        <Footer>
          <Button
            $primary
            $marginRight="0.5em"
            disabled={loading}
            onClick={removePost}
          >
            {loading ? 'กำลังลบ...' : 'ยืนยัน'}
          </Button>

          <Button $light onClick={hidePostRMModal}>
            ยกเลิก
          </Button>
        </Footer>
      </ModalPanel>
    </ModalBackground>
  )
}