"use client";

import styled from "styled-components";
import { useForm } from "react-hook-form";

import { ATTACHMENT } from "@/lib/constants/post-content/components";
import type { PostComponentEditorProps } from "@/types/post-component-editor";
import { Body, Footer, Header } from "@/lib/components/Card";
import { Form, InputField } from "@/lib/components/Form";
import { Button } from "@/lib/ui/button";

const AttachmentUploadWrapper = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`;

interface AttachmentFormValues {
  filename: string;
}

interface AttachmentData {
  filename: string;
  type: string;
  size: string;
}

type AttachmentProps = PostComponentEditorProps<
  AttachmentData,
  typeof ATTACHMENT
>;

/**
 * @name Attachment
 * @desc Displays an available file to download.
 */
const Attachment = (props: AttachmentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttachmentFormValues>({
    defaultValues: {
      filename: "",
    },
  });

  const hideThisModal = props.useToAddComponent
    ? props.hideAddPostComponentModal
    : props.hideEditPostComponentModal;

  const onSubmit = ({ filename }: AttachmentFormValues) => {
    const data: AttachmentData = {
      filename,
      type: "PDF",
      size: "100",
    };

    if (props.useToAddComponent) {
      props.addNewPostComponent({
        data,
        type: ATTACHMENT,
        order: props.order,
      });

      props.hideAddPostComponentModal();
      return;
    }

    props.editPostComponent({
      newData: data,
      type: ATTACHMENT,
      order: props.order,
    });

    props.hideEditPostComponentModal();
  };

  return (
    <>
      <Header>Attachment</Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <AttachmentUploadWrapper>
            <Button
              variant="light"
              type="button"
            >
              Select File
            </Button>
          </AttachmentUploadWrapper>

          <InputField
            type="text"
            {...register("filename", {
              required: "Filename is required",
            })}
            error={errors.filename?.message}
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

export default Attachment;