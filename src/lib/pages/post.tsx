"use client";

import {
  useDispatch,
  useSelector,
} from "react-redux";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import PostViewer from "@/lib/components/PostPage/PostViewer";
import {
  hidePostRemovalConfirmationModal,
  showPostRemovalConfirmationModal,
} from "@/lib/slices/post-removal-confirmation-modal";
import { RootState } from "../initRedux";
import { useGetPost } from "@/lib/api/client/post/use-get-post";
interface PostPageProps {
  postID: string;
}

export default function PostPage({
  postID,
}: PostPageProps) {
  const dispatch = useDispatch();

  const isPostRMModalShowing =
    useSelector(
      (state: RootState) =>
        state.postRemovalConfirmationModal
    );

  const {
    data,
    loading,
    error,
  } = useGetPost(postID);

  if (error) {
    return (
      <AuthenticatedLayout>
        <p>
          Unable to load the post.
        </p>
      </AuthenticatedLayout>
    );
  }

  const post =
    data?.getPost?.post;

  const graphQLError =
    data?.getPost?.err;

  if (
    !loading &&
    graphQLError
  ) {
    return (
      <AuthenticatedLayout>
        <p>
          {graphQLError.message}
        </p>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <PostViewer
        postID={postID}
        loading={loading}
        hidePostRMModal={() =>
          dispatch(
            hidePostRemovalConfirmationModal()
          )
        }
        showPostRMModal={() =>
          dispatch(
            showPostRemovalConfirmationModal()
          )
        }
        isPostRMModalShowing={
          isPostRMModalShowing
        }
        recipe={
          !loading && post
            ? post.recipe
            : null
        }
        comments={
          !loading && post
            ? post.comments
            : undefined
        }
      />
    </AuthenticatedLayout>
  );
}