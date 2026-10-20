"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { VIDEO } from "@/constants/post-content/components";
import { Form } from "@/components/Form";
import { Button } from "@/components/Button";
import { Body, Footer, Header } from "@/components/Card";

const videoSchema = z.object({
  video_url: z
    .string()
    .trim()
    .url("Enter a valid URL"),
});

type VideoFormValues = z.infer<typeof videoSchema>;

interface VideoOwnProps {
  useToAddComponent: boolean;

  hideAddPostComponentModal?: () => void;
  hideEditPostComponentModal?: () => void;

  addNewPostComponent?: (component: {
    data: {
      url: string;
    };
    type: typeof VIDEO;
    order: number;
  }) => void;

  editPostComponent?: (component: {
    newData: {
      url: string;
    };
    type: typeof VIDEO;
    order: number;
  }) => void;

  order: number;
}

export default function Video({
  useToAddComponent,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
  order,
}: VideoOwnProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoFormValues>({
    defaultValues: {
      video_url: "",
    },
  });

  const addComponentHandler = ({
    video_url,
  }: VideoFormValues) => {
    if (!addNewPostComponent) {
      return;
    }

    addNewPostComponent({
      data: {
        url: video_url,
      },
      type: VIDEO,
      order,
    });

    hideAddPostComponentModal?.();
  };

  const editComponentHandler = ({
    video_url,
  }: VideoFormValues) => {
    if (!editPostComponent) {
      return;
    }

    editPostComponent({
      newData: {
        url: video_url,
      },
      type: VIDEO,
      order,
    });

    hideEditPostComponentModal?.();
  };

  const hideThisModal = useToAddComponent
    ? hideAddPostComponentModal
    : hideEditPostComponentModal;

  const submitHandler = useToAddComponent
    ? addComponentHandler
    : editComponentHandler;

  return (
    <>
      <Header>Video</Header>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Body>
          <input
            {...register("video_url", {
              required: "Video URL is required",
              validate: (value) => {
                const result = videoSchema.shape.video_url.safeParse(value);

                return result.success
                  ? true
                  : result.error.issues[0]?.message;
              },
            })}
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
          />

          {errors.video_url && (
            <p>{errors.video_url.message}</p>
          )}
        </Body>

        <Footer>
          <Button
            $success
            $marginRight="0.5em"
            type="submit"
          >
            Done
          </Button>

          <Button
            $danger
            type="button"
            onClick={hideThisModal}
          >
            Cancel
          </Button>
        </Footer>
      </Form>
    </>
  );
}