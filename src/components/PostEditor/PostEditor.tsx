"use client";

import { useDispatch, useSelector } from "react-redux";

import PostComponentSelectorModal from "./PostComponentsSelectorModal";
import EditPostComponentModal from "./EditPostComponentModal";
import AddPostComponentModal from "./AddPostComponentModal";
import PostPreviewModal from "./PostPreviewModal";
import PostContentEditor from "./PostContentEditor";


import {
  hidePostComponentsSelectorModal,
  showPostComponentsSelectorModal,
} from "@/lib/slices/post-components-selector-modal";

import {
  hideAddPostComponentModal,
  showAddPostComponentModal,
} from "@/lib/slices/add-post-component-modal";

import {
  hideEditPostComponentModal,
  showEditPostComponentModal,
} from "@/lib/slices/edit-post-component-modal";

import {
  addNewPostComponent,
  editPostComponent,
  removePostComponent,
  resetPost,
} from "@/lib/slices/editing-post-receipe";
import { hidePostPreviewModal, showPostPreviewModal } from "@/lib/slices/post-preview-modal";
import { hideLoadingModal, showLoadingModal } from "@/lib/slices/mutation-status";

interface PostEditorProps {
  classroomID: string;
}

interface RootState {
  postComponentsSelectorModal: any;
  editPostComponentModal: any;
  addPostComponentModal: any;
  postPreviewModal: boolean;
  editingPostReceipe: any[];
}

export default function PostEditor({
  classroomID,
}: PostEditorProps) {
  const dispatch = useDispatch();

  const isComponentsSelectorModalShowing = useSelector(
    (state: RootState) => state.postComponentsSelectorModal
  );

  const editPostComponentModal = useSelector(
    (state: RootState) => state.editPostComponentModal
  );

  const addPostComponentModal = useSelector(
    (state: RootState) => state.addPostComponentModal
  );

  const isPostPreviewModalShowing = useSelector(
    (state: RootState) => state.postPreviewModal
  );

  const receipe = useSelector(
    (state: RootState) => state.editingPostReceipe
  );

  return (
    <>
      <EditPostComponentModal
        hideEditPostComponentModal={() =>
          dispatch(hideEditPostComponentModal())
        }
        editPostComponentModal={editPostComponentModal}

        editPostComponent={(component) => {
          dispatch(editPostComponent(component));
        }}

      />

      <AddPostComponentModal
        hideAddPostComponentModal={() =>
          dispatch(hideAddPostComponentModal())
        }
        addPostComponentModal={addPostComponentModal}
        addNewPostComponent={(componentToAdd) =>
          dispatch(addNewPostComponent(componentToAdd))
        }
        receipe={receipe}
      />

      <PostComponentSelectorModal
        isComponentsSelectorModalShowing={
          isComponentsSelectorModalShowing
        }
        hideComponentsSelectorModal={() =>
          dispatch(hidePostComponentsSelectorModal())
        }
        showAddPostComponentModal={(type) =>
          dispatch(showAddPostComponentModal(type))
        }
      />

      <PostPreviewModal
        hidePostPreviewModal={() =>
          dispatch(hidePostPreviewModal())
        }
        isShowing={isPostPreviewModalShowing}
        receipe={receipe}
      />

      <PostContentEditor
        showComponentsSelectorModal={() =>
          dispatch(showPostComponentsSelectorModal())
        }
        showEditPostComponentModal={(type, order) =>
          dispatch(showEditPostComponentModal({
            type,
            order,
          }))
        }
        showPostPreviewModal={() =>
          dispatch(showPostPreviewModal())
        }
        removePostComponent={(componentOrder) =>
          dispatch(removePostComponent(componentOrder))
        }
        showLoadingModal={() =>
          dispatch(showLoadingModal())
        }
        hideLoadingModal={() =>
          dispatch(hideLoadingModal())
        }
        classroomID={classroomID}
        resetPost={() =>
          dispatch(resetPost())
        }
        receipe={receipe}
      />
    </>
  );
}