'use client'

import PostRemovalConfirmationModal from './PostRemovalConfirmationModal'
import PostCommentsPanel, { CommentType } from './PostCommentsPanel'
import CommentMessageBox from './CommentMessageBox'
import PostActivityPanel from './PostActivityPanel'
import LoadingIcon from '../LoadingIcon'
import PostContent from './PostContent'
import Container from '../Container'

type PostViewerProps = {
  isPostRMModalShowing: boolean
  hidePostRMModal: () => void
  showPostRMModal: () => void
  comments: CommentType[]
  loading: boolean
  postID: string
  recipe: string
}

export default function PostViewer({
  isPostRMModalShowing,
  hidePostRMModal,
  showPostRMModal,
  comments,
  loading,
  postID,
  recipe,
}: PostViewerProps) {
  if (loading) {
    return <LoadingIcon />
  }

  return (
    <Container>
      <PostContent recipe={recipe} />

      <PostCommentsPanel comments={comments} />

      <CommentMessageBox />

      <PostActivityPanel showPostRMModal={showPostRMModal} />

      <PostRemovalConfirmationModal
        postID={postID}
        isPostRMModalShowing={isPostRMModalShowing}
        hidePostRMModal={hidePostRMModal}
      />
    </Container>
  )
}