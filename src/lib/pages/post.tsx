"use client";

import { useSearchParams } from "next/navigation";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useDispatch, useSelector } from "react-redux";

import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import PostViewer from "@/lib/components/PostPage/PostViewer";
import { hidePostRemovalConfirmationModal, showPostRemovalConfirmationModal } from "../slices/post-removal-confirmation-modal";

interface GetPostData {
  getPost: {
    post: {
      title: string;
      recipe: string;
      comments?: PostComment[];
    } | null;
    err: {
      message: string;
    } | null;
  };
}

interface GetPostVariables {
  _id: string;
}

interface RootState {
  postRemovalConfirmationModal: boolean;
}

const GET_POST_QUERY = gql`
  query GetPost($_id: String!) {
    getPost(_id: $_id) {
      post {
        title
        recipe
        comments {
          message
          creator {
            _id
            fname
            profilePicture
          }
          subComments {
            message
            creator {
              _id
              fname
              profilePicture
            }
          }
        }
      }
      err {
        message
      }
    }
  }
`;

export default function PostPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const postID = searchParams.get("id");

  const isPostRMModalShowing = useSelector(
    (state: RootState) => state.postRemovalConfirmationModal
  );

  const { data, loading } = useQuery<
    GetPostData,
    GetPostVariables
  >(GET_POST_QUERY, {
    variables: {
      _id: postID ?? "",
    },
    skip: !postID,
  });

  const post = data?.getPost?.post;

  if (!postID) {
    return (
      <AuthenticatedLayout>
        <p>Post ID was not specified.</p>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <PostViewer
        postID={postID}
        loading={loading}
        hidePostRMModal={() =>
          dispatch(hidePostRemovalConfirmationModal())
        }
        showPostRMModal={() =>
          dispatch(showPostRemovalConfirmationModal())
        }
        isPostRMModalShowing={isPostRMModalShowing}
        recipe={!loading && post ? post.recipe : null}
        comments={!loading && post ? post?.comments : undefined}
      />
    </AuthenticatedLayout>
  );
}