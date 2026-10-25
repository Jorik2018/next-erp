import PostRemovalConfirmationModal from './PostRemovalConfirmationModal'
import PostCommentsPanel from './PostCommentsPanel'
import CommentMessageBox from './CommentMessageBox'
import PostActivityPanel from './PostActivityPanel'
import LoadingIcon from '../LoadingIcon'
import PostContent from './PostContent'
import Container from '../Container'

interface PostViewerProp {
  isPostRMModalShowing: boolean,
  hidePostRMModal: () => void,
  showPostRMModal: () => void,
  comments?: PostComment[],
  postID: string,
  loading: boolean,
  recipe: any
}
/**
 * @name PostViewer
 * @desc Display post content, comments in one component
 * @prop { postID } [NEXT] : Post ID
 * @prop { recipe } [APOLLO] : Post recipe
 * @prop { loading } [APOLLO] : Determining wether GraphQL operation is complete or not
 * @prop { comments } [APOLLO] : Array of post's comments
 * @prop { showPostRMModal } [REDUX] : Show the modal
 * @prop { hidePostRMModal } [REDUX] : Hide the modal
 * @prop { isPostRMModalShowing } [REDUX] : State of the modal(is displaying or not)
 */
const PostViewer = ({
  isPostRMModalShowing,
  hidePostRMModal,
  showPostRMModal,
  comments,
  loading,
  postID,
  recipe
}: PostViewerProp) =>
  !loading ? (
    <Container>
      <PostContent recipe={recipe} />
      <PostCommentsPanel comments={comments} />
      <CommentMessageBox />
      <PostActivityPanel postId={postID} showPostRMModal={showPostRMModal} />
      <PostRemovalConfirmationModal
        postID={postID}
        isPostRMModalShowing={isPostRMModalShowing}
        hidePostRMModal={hidePostRMModal}
      />
    </Container>
  ) : (
    <LoadingIcon />
  )

export default PostViewer
