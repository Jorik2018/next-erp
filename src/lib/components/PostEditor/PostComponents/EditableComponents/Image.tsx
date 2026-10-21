"use client";

import styled from "styled-components";
import { useForm } from "react-hook-form";

import { IMAGE } from "@/lib/constants/post-content/components";
import type { PostComponentEditorProps } from "@/types/post-component-editor";
import { Form, InputField } from "@/lib/components/Form";
import { Body, Footer, Header } from "@/lib/components/Card";
import { Button } from "@/lib/components/Button";

const ImageUploadWrapper = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`;

interface ImageFormValues {
  image_url: string;
  image_alt: string;
}

interface ImageData {
  url: string;
  alt: string;
}

type ImageProps = PostComponentEditorProps<
  ImageData,
  typeof IMAGE
>;

/**
 * @name Image
 * @desc Displays an image used as visual content for a post.
 */
const Image = (props: ImageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImageFormValues>({
    defaultValues: {
      image_url: "",
      image_alt: "",
    },
  });

  const hideThisModal = props.useToAddComponent
    ? props.hideAddPostComponentModal
    : props.hideEditPostComponentModal;

  const onSubmit = ({
    image_url,
    image_alt,
  }: ImageFormValues) => {
    const data: ImageData = {
      url: image_url,
      alt: image_alt || image_url,
    };

    if (props.useToAddComponent) {
      props.addNewPostComponent({
        data,
        type: IMAGE,
        order: props.order,
      });

      props.hideAddPostComponentModal();
      return;
    }

    props.editPostComponent({
      newData: data,
      type: IMAGE,
      order: props.order,
    });

    props.hideEditPostComponentModal();
  };

  return (
    <>
      <Header>Image</Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <ImageUploadWrapper>
            <Button variant="light" type="button">
              Select Image
            </Button>
          </ImageUploadWrapper>

          <InputField
            type="text"
            label="Image URL"
            {...register("image_url", {
              required: "Image URL is required",
            })}
            error={errors.image_url?.message}
          />

          <InputField
            type="text"
            label="Alternative text"
            {...register("image_alt")}
            error={errors.image_alt?.message}
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

export default Image;