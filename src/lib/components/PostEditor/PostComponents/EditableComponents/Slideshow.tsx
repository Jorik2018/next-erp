"use client";

import { useState, type FormEvent } from "react";
import styled from "styled-components";

import { SLIDE_SHOW } from "@/lib/constants/post-content/components";
import type { PostComponentEditorProps } from "@/types/post-component-editor";
import { Button, CircleButton } from "@/lib/components/Button";
import { Form, Input } from "@/lib/components/Form";
import { Body, Footer, Header } from "@/lib/components/Card";

const ImageUploadWrapper = styled.div`
  height: 250px;
  width: 100%;
  margin-bottom: 1em;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`;

interface SlideshowImage {
  id: string;
  url: string;
  alt: string;
}

type SlideshowProps = PostComponentEditorProps<
  SlideshowImage[],
  typeof SLIDE_SHOW
>;

/**
 * @name Slideshow
 * @desc Displays a slideshow of images as part of a post.
 */
const Slideshow = (props: SlideshowProps) => {
  const [imageToAddURL, setImageToAddURL] = useState("");
  const [imageToAddALT, setImageToAddALT] = useState("");
  const [images, setImages] = useState<SlideshowImage[]>([]);

  const hideThisModal = props.useToAddComponent
    ? props.hideAddPostComponentModal
    : props.hideEditPostComponentModal;

  const removeImage = (id: string) => {
    setImages((currentImages) =>
      currentImages.filter((image) => image.id !== id)
    );
  };

  const addImage = () => {
    const url = imageToAddURL.trim();

    if (!url) {
      return;
    }

    setImages((currentImages) => [
      ...currentImages,
      {
        id: crypto.randomUUID(),
        url,
        alt: imageToAddALT.trim() || url,
      },
    ]);

    setImageToAddURL("");
    setImageToAddALT("");
  };

  const submitHandler = () => {
    if (images.length < 2) {
      return;
    }

    if (props.useToAddComponent) {
      props.addNewPostComponent({
        type: SLIDE_SHOW,
        data: images,
        order: props.order,
      });

      props.hideAddPostComponentModal();
      return;
    }

    props.editPostComponent({
      newData: images,
      type: SLIDE_SHOW,
      order: props.order,
    });

    props.hideEditPostComponentModal();
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    submitHandler();
  };

  return (
    <>
      <Header>Image Slideshow</Header>

      <Form onSubmit={handleSubmit}>
        <Body>
          {images.map((image) => (
            <ImageUploadWrapper key={image.id}>
              <CircleButton
                variant="destructive"
                size="icon"
                type="button"
                $position="absolute"
                $top="1em"
                $right="1em"
                onClick={() => removeImage(image.id)}
              >
                -
              </CircleButton>

              <Button variant="light" type="button">
                Select Image
              </Button>

              <span>{image.url}</span>
            </ImageUploadWrapper>
          ))}

          <div>
            <Input
              name="imageToAddURL"
              type="text"
              placeholder="Image URL"
              value={imageToAddURL}
              onChange={(event) =>
                setImageToAddURL(event.target.value)
              }
            />

            <Input
              name="imageToAddALT"
              type="text"
              placeholder="Alternative text"
              value={imageToAddALT}
              onChange={(event) =>
                setImageToAddALT(event.target.value)
              }
            />

            <Button
              variant="primary"
              width="full"
              className="mt-4"
              type="button"
              onClick={addImage}
            >
              Add Image
            </Button>
          </div>
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

export default Slideshow;