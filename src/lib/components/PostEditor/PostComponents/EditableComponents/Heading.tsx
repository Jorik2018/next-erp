"use client";

import { useForm } from "react-hook-form";

import { HEADING } from "@/lib/constants/post-content/components";
import type { PostComponentEditorProps } from "@/types/post-component-editor";
import { Form, InputField } from "@/lib/components/Form";
import { Body, Footer, Header } from "@/lib/components/Card";
import { Button } from "@/lib/ui/button";

interface HeadingFormValues {
  heading_text: string;
}

type HeadingProps = PostComponentEditorProps<
  string,
  typeof HEADING
>;

const Heading = (props: HeadingProps) => {
  const { register, handleSubmit } =
    useForm<HeadingFormValues>({
      defaultValues: {
        heading_text: "",
      },
    });

  const onSubmit = ({
    heading_text,
  }: HeadingFormValues) => {
    if (props.useToAddComponent) {
      props.addNewPostComponent({
        data: heading_text,
        type: HEADING,
        order: props.order,
      });

      props.hideAddPostComponentModal();
      return;
    }

    props.editPostComponent({
      newData: heading_text,
      type: HEADING,
      order: props.order,
    });

    props.hideEditPostComponentModal();
  };

  const hideThisModal = props.useToAddComponent
    ? props.hideAddPostComponentModal
    : props.hideEditPostComponentModal;

  return (
    <>
      <Header>Heading</Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <InputField
            type="text"
            {...register("heading_text")}
          />
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

export default Heading;