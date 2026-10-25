import {
  gql,
  type TypedDocumentNode,
} from "@apollo/client";

import { useQuery } from "@apollo/client/react";

interface PostComment {
  message: string;
  creator: {
    _id: string;
    fname: string;
    profilePicture?: string;
  };
  subComments: {
    message: string;
    creator: {
      _id: string;
      fname: string;
      profilePicture?: string;
    };
  }[];
}

export interface Post {
  _id: string;
  title: string;
  recipe: string;
  isPublic: boolean;
  classroom: string;
  comments?: PostComment[];
}

interface GetPostData {
  getPost: {
    post: Post | null;
    err: {
      message: string;
    } | null;
  };
}

interface GetPostVariables {
  _id: string;
}

export const GET_POST_QUERY: TypedDocumentNode<
  GetPostData,
  GetPostVariables
> = gql`
  query GetPost($_id: String!) {
    getPost(_id: $_id) {
      post {
        _id
        title
        recipe
        isPublic
        classroom

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

export const useGetPost = (
  postID?: string,
) => {
  return useQuery(GET_POST_QUERY, {
    variables: {
      _id: postID ?? "",
    },
    skip: !postID,
  });
};