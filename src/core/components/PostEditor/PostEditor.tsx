'use client'

import { useDispatch, useSelector } from 'react-redux'

import PostComponentSelectorModal from './PostComponentsSelectorModal'
import EditPostComponentModal from './EditPostComponentModal'
import AddPostComponentModal from './AddPostComponentModal'
import PostPreviewModal from './PostPreviewModal'
import PostContentEditor from './PostContentEditor'

import { hidePostComponentsSelectorModal, showPostComponentsSelectorModal } from '@/core/slices/post-components-selector-modal'
import { hideAddPostComponentModal, showAddPostComponentModal } from '@/core/slices/add-post-component-modal'
import { hideEditPostComponentModal, showEditPostComponentModal } from '@/core/slices/edit-post-component-modal'
import { hidePostPreviewModal, showPostPreviewModal } from '@/core/slices/post-preview-modal'
import { addNewPostComponent, editPostComponent, removePostComponent, resetPost } from '@/core/slices/editing-post-receipe'
import { AppDispatch, RootState } from '@/core/store'
import { hideLoadingModal, showLoadingModal } from '@/core/slices/mutation-status'

type PostEditorProps = {
  classroomID: string
}

export default function PostEditor({ classroomID }: PostEditorProps) {
  const dispatch = useDispatch<AppDispatch>()

  const isComponentsSelectorModalShowing = useSelector(
    (state: RootState) => state.postComponentsSelectorModal,
  )

  const editPostComponentModal = useSelector(
    (state: RootState) => state.editPostComponentModal,
  )

  const addPostComponentModal = useSelector(
    (state: RootState) => state.addPostComponentModal,
  )

  const isPostPreviewModalShowing = useSelector(
    (state: RootState) => state.postPreviewModal,
  )

  const receipe = useSelector(
    (state: RootState) => state.editingPostReceipe,
  )

  return (
    <div>
      <EditPostComponentModal
        hideEditPostComponentModal={() =>
          dispatch(hideEditPostComponentModal())
        }
        editPostComponentModal={editPostComponentModal}
        editPostComponent={(order, type:any, newData:any) =>
          dispatch(editPostComponent({ order, type, newData }))
        }
        receipe={receipe}
      />

      <AddPostComponentModal
        hideAddPostComponentModal={() =>
          dispatch(hideAddPostComponentModal())
        }
        addPostComponentModal={addPostComponentModal}
        addNewPostComponent={componentToAdd =>
          dispatch(addNewPostComponent(componentToAdd))
        }
        receipe={receipe}
      />

      <PostComponentSelectorModal
        isComponentsSelectorModalShowing={isComponentsSelectorModalShowing}
        hideComponentsSelectorModal={() =>
          dispatch(hidePostComponentsSelectorModal())
        }
        showAddPostComponentModal={type =>
          dispatch(showAddPostComponentModal(type))
        }
      />

      <PostPreviewModal
        hidePostPreviewModal={() => dispatch(hidePostPreviewModal())}
        isShowing={isPostPreviewModalShowing}
        receipe={receipe}
      />

      <PostContentEditor
        showComponentsSelectorModal={() =>
          dispatch(showPostComponentsSelectorModal())
        }
        showEditPostComponentModal={(type, order) =>
          dispatch(showEditPostComponentModal({ type, order }))
        }
        showPostPreviewModal={() => dispatch(showPostPreviewModal())}
        removePostComponent={componentOrder =>
          dispatch(removePostComponent(componentOrder))
        }
        showLoadingModal={() => dispatch(showLoadingModal())}
        hideLoadingModal={() => dispatch(hideLoadingModal())}
        classroomID={classroomID}
        resetPost={() => dispatch(resetPost())}
        receipe={receipe}
      />
    </div>
  )
}