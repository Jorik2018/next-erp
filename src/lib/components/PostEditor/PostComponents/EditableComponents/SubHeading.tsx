"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SUB_HEADING } from "@/lib/constants/post-content/components";
import { Header, Body, Footer } from "@/lib/components/Card";
import { Form } from "@/lib/components/Form";
import { Button } from "@/lib/components/Button";

const subHeadingSchema = z.object({
  sub_heading_text: z
    .string()
    .trim()
    .min(1, "Subheading is required"),
});

type SubHeadingFormValues = z.infer<typeof subHeadingSchema>;

interface SubHeadingProps {
  useToAddComponent: boolean;
  order: number;

  hideAddPostComponentModal?: () => void;
  hideEditPostComponentModal?: () => void;

  addNewPostComponent?: (component: {
    data: string;
    type: typeof SUB_HEADING;
    order: number;
  }) => void;

  editPostComponent?: (component: {
    newData: string;
    type: typeof SUB_HEADING;
    order: number;
  }) => void;
}

export default function SubHeading({
  useToAddComponent,
  order,
  hideAddPostComponentModal,
  hideEditPostComponentModal,
  addNewPostComponent,
  editPostComponent,
}: SubHeadingProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubHeadingFormValues>({
    resolver: zodResolver(subHeadingSchema),
    defaultValues: {
      sub_heading_text: "",
    },
  });

  const addComponentHandler = ({
    sub_heading_text,
  }: SubHeadingFormValues) => {
    if (!addNewPostComponent) {
      return;
    }

    addNewPostComponent({
      data: sub_heading_text,
      type: SUB_HEADING,
      order,
    });

    hideAddPostComponentModal?.();
  };

  const editComponentHandler = ({
    sub_heading_text,
  }: SubHeadingFormValues) => {
    if (!editPostComponent) {
      return;
    }

    editPostComponent({
      newData: sub_heading_text,
      type: SUB_HEADING,
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
      <Header>Subheading</Header>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Body>
          <input
            {...register("sub_heading_text")}
            type="text"
            placeholder="Enter subheading"
          />

          {errors.sub_heading_text && (
            <p>{errors.sub_heading_text.message}</p>
          )}
        </Body>

        <Footer>
          <Button
            variant="primary"
            className="mr-2"
            type="submit"
          >
            Done
          </Button>

          <Button
            variant="light"
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