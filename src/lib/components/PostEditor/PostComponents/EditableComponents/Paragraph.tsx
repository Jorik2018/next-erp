"use client";

import { useForm } from "react-hook-form";

import { PARAGRAPH } from "@/lib/constants/post-content/components";
import type { PostComponentEditorProps } from "@/types/post-component-editor";
import { Button } from "@/lib/components/Button";
import { Form, TextAreaField } from "@/lib/components/Form";
import { Body, Footer, Header } from "@/lib/components/Card";

interface ParagraphFormValues {
  paragraph_text: string;
}

type ParagraphProps = PostComponentEditorProps<
  string,
  typeof PARAGRAPH
>;

/**
 * @name Paragraph
 * @desc Displays paragraph text used to present the topic content in detail.
 */
const Paragraph = (props: ParagraphProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParagraphFormValues>({
    defaultValues: {
      paragraph_text: "",
    },
  });

  const hideThisModal = props.useToAddComponent
    ? props.hideAddPostComponentModal
    : props.hideEditPostComponentModal;

  const onSubmit = ({
    paragraph_text,
  }: ParagraphFormValues) => {
    if (props.useToAddComponent) {
      props.addNewPostComponent({
        data: paragraph_text,
        type: PARAGRAPH,
        order: props.order,
      });

      props.hideAddPostComponentModal();
      return;
    }

    props.editPostComponent({
      newData: paragraph_text,
      type: PARAGRAPH,
      order: props.order,
    });

    props.hideEditPostComponentModal();
  };

  return (
    <>
      <Header>Paragraph</Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <TextAreaField
            {...register("paragraph_text", {
              required: "Paragraph is required",
            })}
            error={errors.paragraph_text?.message}
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

export default Paragraph;