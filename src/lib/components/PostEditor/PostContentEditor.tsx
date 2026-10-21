"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  renderEditableComponent,
  type PostComponent,
  type PostComponentType,
} from "@/helpers/post";

import EmptyField from "./PostComponents/EmptyField";
import { CircleButton } from "@/lib/components/Button";
import { InputField } from "@/lib/components/Form";
import Card from "@/lib/components/Card";
import { POST_PAGE } from "@/lib/constants/endpoints/ui";

interface PostFormValues {
  title: string;
}

interface CreatePostData {
  createPost: {
    success: boolean;
    post: {
      _id: string;
    } | null;
    err: {
      message: string;
    } | null;
  };
}

interface CreatePostVariables {
  title: string;
  recipe: string;
  isPublic: boolean;
  classroomID: string;
}

interface PostContentEditorProps {
  classroomID: string;
  receipe: PostComponent[];

  showComponentsSelectorModal: () => void;

  showEditPostComponentModal: (
    type: PostComponentType,
    order: number
  ) => void;

  showPostPreviewModal: () => void;

  removePostComponent: (order: number) => void;

  showLoadingModal: () => void;
  hideLoadingModal: () => void;

  resetPost: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   GraphQL                                  */
/* -------------------------------------------------------------------------- */

const CREATE_POST_MUTATION = gql`
  mutation CreatePost(
    $title: String!
    $recipe: String!
    $isPublic: Boolean!
    $classroomID: String!
  ) {
    createPost(
      title: $title
      recipe: $recipe
      isPublic: $isPublic
      classroomID: $classroomID
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

/* -------------------------------------------------------------------------- */
/*                              PostContentEditor                             */
/* -------------------------------------------------------------------------- */

const PostContentEditor = ({
  classroomID,
  receipe,
  resetPost,
  removePostComponent,
  showLoadingModal,
  hideLoadingModal,
  showPostPreviewModal,
  showEditPostComponentModal,
  showComponentsSelectorModal,
}: PostContentEditorProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
    },
  });

  const [createPost] = useMutation<
    CreatePostData,
    CreatePostVariables
  >(CREATE_POST_MUTATION);

  /* ------------------------------------------------------------------------ */
  /*                                Save Post                                 */
  /* ------------------------------------------------------------------------ */

  const savePost = async ({
    title,
  }: PostFormValues) => {
    if (receipe.length === 0) {
      alert("Post must have at least one component.");
      return;
    }

    showLoadingModal();

    try {
      const { data } = await createPost({
        variables: {
          title: title.trim(),
          classroomID,
          isPublic: false,
          recipe: JSON.stringify(receipe),
        },
      });

      const result = data?.createPost;

      if (!result?.success || !result.post) {
        alert(
          result?.err?.message ??
            "Unable to create the post."
        );

        return;
      }

      resetPost();

      router.push(
        `${POST_PAGE}?id=${result.post._id}`
      );
    } catch (error) {
      console.error(
        "Unable to create post:",
        error
      );

      alert("Unable to create the post.");
    } finally {
      hideLoadingModal();
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                                  Render                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <form onSubmit={handleSubmit(savePost)}>
      {/* Post title */}

      <Card
        $fluidWidth
        $padding="2em"
        $marginBottom="2em"
      >
        <InputField
          type="text"
          label="Post title"
          {...register("title", {
            required: "Title is required",
            validate: (value) =>
              value.trim().length > 0 ||
              "Title is required",
          })}
          error={errors.title?.message}
        />
      </Card>

      {/* Post components */}

      <Card
        $fluidWidth
        $noShadow
        $padding="2em"
        $marginBottom="4em"
      >
        {renderEditableComponent(
          receipe,
          removePostComponent,
          showEditPostComponentModal
        )}

        <EmptyField
          onClick={showComponentsSelectorModal}
        />
      </Card>

      {/* Editor actions */}

      {receipe.length > 0 && (
        <>
          <CircleButton
            variant="light"
            type="button"
            $position="fixed"
            $right="3em"
            $bottom="17em"
            $padding="1.3em 1em"
            onClick={resetPost}
          >
            Reset
          </CircleButton>

          <CircleButton
            variant="light"
            type="button"
            $position="fixed"
            $right="3em"
            $bottom="11em"
            $padding="1.3em 1em"
            onClick={showPostPreviewModal}
          >
            Preview
          </CircleButton>

          <CircleButton
            variant="primary"
            type="submit"
            $position="fixed"
            $right="3em"
            $bottom="5em"
            $padding="1.3em 1em"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </CircleButton>
        </>
      )}
    </form>
  );
};

export default PostContentEditor;