// src/lib/api/client/post/use-save-post.ts

import { gql } from "@apollo/client";
import type { TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

interface SavePostData {
  savePost: {
    success: boolean;
    post: {
      _id: string;
    } | null;
    err: {
      message: string;
    } | null;
  };
}

interface SavePostVariables {
  title: string;
  recipe: string;
  isPublic: boolean;
  classroomID?: string;
  postID?: string;
}

const SAVE_POST_MUTATION: TypedDocumentNode<
  SavePostData,
  SavePostVariables
> = gql`
  mutation SavePost(
    $postID: String
    $classroomID: String
    $title: String!
    $recipe: String!
    $isPublic: Boolean!
  ) {
    savePost(
      postID: $postID
      classroomID: $classroomID
      title: $title
      recipe: $recipe
      isPublic: $isPublic
    ) {
      success

      post {
        _id
      }

      err {
        message
      }
    }
  }
`;

export const useSavePost = () => {
  return useMutation(SAVE_POST_MUTATION);
};