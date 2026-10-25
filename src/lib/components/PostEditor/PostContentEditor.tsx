"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  renderEditableComponent,
  type PostComponent,
  type PostComponentType,
} from "@/lib/helpers/post";

import type { Post } from "@/lib/api/client/post/use-get-post";
import { useSavePost } from "@/lib/api/client/post/use-save-post";
import { GET_POST_QUERY } from "@/lib/api/client/post/use-get-post";
import EmptyField from "./PostComponents/EmptyField";
import { InputField } from "@/lib/components/Form";
import Card from "@/lib/components/Card";
import { POST_PAGE } from "@/lib/constants/endpoints/ui";
import { CircleButton } from "@/lib/ui/button";

interface PostFormValues {
  title: string;
}

interface PostContentEditorProps {
  post?: Post | null;

  classroomID?: string;
  postID?: string;

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

const PostContentEditor = ({
  post,
  classroomID,
  postID,
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
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
    },
  });

  // -----------------------------------------------------------------------
  // Initialize form when editing an existing post
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (!post) {
      return;
    }

    reset({
      title: post.title,
    });
  }, [post, reset]);

  const [savePostMutation] = useSavePost();

  // -----------------------------------------------------------------------
  // Save Post
  // -----------------------------------------------------------------------
  const savePost = async ({
    title,
  }: PostFormValues) => {
    if (receipe.length === 0) {
      alert("Post must have at least one component.");
      return;
    }

    // CREATE -> classroomID comes from props
    // UPDATE -> classroomID comes from loaded post
    const effectiveClassroomID =
      classroomID ?? post?.classroom;

    if (!effectiveClassroomID) {
      alert("Classroom ID is required.");
      return;
    }

    showLoadingModal();

    try {
const { data } = await savePostMutation({
  variables: {
    postID,
    classroomID: effectiveClassroomID,
    title: title.trim(),
    isPublic: post?.isPublic ?? false,
    recipe: JSON.stringify(receipe),
  },

  refetchQueries: postID
    ? [
        {
          query: GET_POST_QUERY,
          variables: {
            _id: postID,
          },
        },
      ]
    : [],
});

      const result = data?.savePost;

      if (!result?.success || !result.post) {
        alert(
          result?.err?.message ??
          "Unable to save the post."
        );

        return;
      }

      resetPost();

      router.push(
        `${POST_PAGE}/${result.post._id}`
      );
    } catch (error) {
      console.error(
        "Unable to save post:",
        error
      );

      alert("Unable to save the post.");
    } finally {
      hideLoadingModal();
    }
  };
  return (
    <form onSubmit={handleSubmit(savePost)}>
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