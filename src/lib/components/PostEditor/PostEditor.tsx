"use client";

import { useEffect } from "react";
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
  initializePost,
  removePostComponent,
  resetPost,
} from "@/lib/slices/editing-post-receipe";

import {
  hidePostPreviewModal,
  showPostPreviewModal,
} from "@/lib/slices/post-preview-modal";

import {
  hideLoadingModal,
  showLoadingModal,
} from "@/lib/slices/mutation-status";

import { RootState } from "@/lib/initRedux";
import { useGetPost } from "@/lib/api/client/post/use-get-post";

interface PostEditorProps {
  classroomID?: string;
  postID?: string;
}

export default function PostEditor({
  postID,
  classroomID,
}: PostEditorProps) {
  const dispatch = useDispatch();

  // -------------------------------------------------------------
  // Load post when editing
  // -------------------------------------------------------------
  const {
    data,
    loading,
    error,
  } = useGetPost(postID);

  const post = data?.getPost?.post;

  useEffect(() => {
    if (!postID || !post?.recipe) {
      return;
    }

    try {
      const recipe = JSON.parse(post.recipe);

      dispatch(initializePost(recipe));
    } catch (err) {
      console.error("Invalid post recipe", err);
    }
  }, [postID, post?.recipe, dispatch]);

  const isComponentsSelectorModalShowing = useSelector(
    (state: RootState) =>
      state.postComponentsSelectorModal,
  );

  const editPostComponentModal = useSelector(
    (state: RootState) =>
      state.editPostComponentModal,
  );

  const addPostComponentModal = useSelector(
    (state: RootState) =>
      state.addPostComponentModal,
  );

  const isPostPreviewModalShowing = useSelector(
    (state: RootState) =>
      state.postPreviewModal,
  );

  const receipe = useSelector(
    (state: RootState) =>
      state.editingPostReceipe,
  );

  if (postID && loading) {
    return <p>Loading post...</p>;
  }

  if (postID && error) {
    return <p>Unable to load post.</p>;
  }

  if (postID && data?.getPost?.err) {
    return <p>{data.getPost.err.message}</p>;
  }

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
          dispatch(
            hidePostComponentsSelectorModal(),
          )
        }
        showAddPostComponentModal={(type) =>
          dispatch(
            showAddPostComponentModal(type),
          )
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
        post={post}
        postID={postID}
        classroomID={classroomID}

        showComponentsSelectorModal={() =>
          dispatch(
            showPostComponentsSelectorModal(),
          )
        }

        showEditPostComponentModal={(type, order) =>
          dispatch(
            showEditPostComponentModal({
              type,
              order,
            }),
          )
        }

        showPostPreviewModal={() =>
          dispatch(showPostPreviewModal())
        }

        removePostComponent={(componentOrder) =>
          dispatch(
            removePostComponent(componentOrder),
          )
        }

        showLoadingModal={() =>
          dispatch(showLoadingModal())
        }

        hideLoadingModal={() =>
          dispatch(hideLoadingModal())
        }

        resetPost={() =>
          dispatch(resetPost())
        }

        receipe={receipe}
      />
    </>
  );
}