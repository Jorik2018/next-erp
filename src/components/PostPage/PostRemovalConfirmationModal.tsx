'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'

import { DASHBOARD_PAGE } from '../../../constants/endpoints/ui'
import { ModalBackground, ModalPanel } from '../../Modal'
import { Header, Body, Footer } from '../Card'
import { Button } from '../Button'

interface PostRemovalConfirmationModalProps {
  isPostRMModalShowing: boolean
  hidePostRMModal: () => void
  showLoadingModal?: () => void
  hideLoadingModal?: () => void
  showErrorAlert?: (message: string) => void
  postID: string
}

interface RemovePostData {
  removePost: {
    success: boolean
    err?: {
      message: string
    } | null
  }
}

interface RemovePostVariables {
  postID: string
}

const REMOVE_POST_MUTATION = gql`
  mutation RemovePost($postID: String!) {
    removePost(postID: $postID) {
      success
      err {
        message
      }
    }
  }
`

/**
 * @name PostRemovalConfirmationModal
 * @desc Prompts the user to confirm post removal.
 */
const PostRemovalConfirmationModal = ({
  isPostRMModalShowing,
  hidePostRMModal,
  showLoadingModal,
  hideLoadingModal,
  showErrorAlert,
  postID
}: PostRemovalConfirmationModalProps) => {
  const router = useRouter()

  const [removePostMutation] = useMutation<
    RemovePostData,
    RemovePostVariables
  >(REMOVE_POST_MUTATION)

  const removePost = async () => {
    showLoadingModal!()

    try {
      const { data } = await removePostMutation({
        variables: {
          postID
        }
      })

      const result = data?.removePost

      if (!result?.success) {
        showErrorAlert!(
          result?.err?.message ??
            'Unable to remove the post.'
        )

        return
      }

      hidePostRMModal()
      router.push(DASHBOARD_PAGE)
    } catch (error) {
      console.error('Unable to remove post:', error)

      showErrorAlert!(
        'Unable to remove the post at this time.'
      )
    } finally {
      hideLoadingModal!()
    }
  }

  return (
    <ModalBackground $show={isPostRMModalShowing}>
      <ModalPanel $large>
        <Header>Confirm Action</Header>

        <Body
          style={{
            color: '#777',
            fontSize: '1em',
            textAlign: 'center'
          }}
        >
          This action cannot be undone, and you will lose all
          data associated with this post. Do you want to continue?
        </Body>

        <Footer>
          <Button
            $primary
            $marginRight="0.5em"
            type="button"
            onClick={removePost}
          >
            Confirm
          </Button>

          <Button
            $light
            type="button"
            onClick={hidePostRMModal}
          >
            Cancel
          </Button>
        </Footer>
      </ModalPanel>
    </ModalBackground>
  )
}

export default PostRemovalConfirmationModal