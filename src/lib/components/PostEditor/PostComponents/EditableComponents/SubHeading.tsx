"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SUB_HEADING } from "@/lib/constants/post-content/components";
import { Header, Body, Footer } from "@/lib/components/Card";
import { Form } from "@/lib/components/Form";
import { Button } from "@/lib/ui/button";

import type {
  PostComponentEditorProps,
} from "@/types/post-component-editor";

const subHeadingSchema = z.object({
  sub_heading_text: z
    .string()
    .trim()
    .min(1, "Subheading is required"),
});

type SubHeadingFormValues =
  z.infer<typeof subHeadingSchema>;

type SubHeadingProps =
  PostComponentEditorProps<
    string,
    typeof SUB_HEADING
  >;

const SubHeading = (
  props: SubHeadingProps
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubHeadingFormValues>({
    resolver: zodResolver(
      subHeadingSchema
    ),

    defaultValues: {
      sub_heading_text: "",
    },
  });

  const onSubmit = ({
    sub_heading_text,
  }: SubHeadingFormValues) => {
    if (props.useToAddComponent) {
      props.addNewPostComponent({
        data: sub_heading_text,
        type: SUB_HEADING,
        order: props.order,
      });

      props.hideAddPostComponentModal();

      return;
    }

    props.editPostComponent({
      newData: sub_heading_text,
      type: SUB_HEADING,
      order: props.order,
    });

    props.hideEditPostComponentModal();
  };

  const hideThisModal =
    props.useToAddComponent
      ? props.hideAddPostComponentModal
      : props.hideEditPostComponentModal;

  return (
    <>
      <Header>Subheading</Header>

      <Form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Body>
          <input
            {...register(
              "sub_heading_text"
            )}
            type="text"
            placeholder="Enter subheading"
          />

          {errors.sub_heading_text && (
            <p>
              {
                errors
                  .sub_heading_text
                  .message
              }
            </p>
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
};

export default SubHeading;