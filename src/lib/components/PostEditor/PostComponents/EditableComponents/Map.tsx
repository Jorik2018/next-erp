"use client";

import { useForm } from "react-hook-form";

import { MAP } from "@/lib/constants/post-content/components";
import type { PostComponentEditorProps } from "@/types/post-component-editor";
import { Body, Footer, Header } from "@/lib/components/Card";
import { Form, InputField } from "@/lib/components/Form";
import { Button } from "@/lib/ui/button";

interface MapFormValues {
  location: string;
}

interface MapData {
  location: string;
}

type MapProps = PostComponentEditorProps<
  MapData,
  typeof MAP
>;

/**
 * @name Map
 * @desc Displays a map used to present a real-world location.
 */
const Map = (props: MapProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MapFormValues>({
    defaultValues: {
      location: "",
    },
  });

  const hideThisModal = props.useToAddComponent
    ? props.hideAddPostComponentModal
    : props.hideEditPostComponentModal;

  const onSubmit = ({ location }: MapFormValues) => {
    const data: MapData = {
      location,
    };

    if (props.useToAddComponent) {
      props.addNewPostComponent({
        data,
        type: MAP,
        order: props.order,
      });

      props.hideAddPostComponentModal();
      return;
    }

    props.editPostComponent({
      newData: data,
      type: MAP,
      order: props.order,
    });

    props.hideEditPostComponentModal();
  };

  return (
    <>
      <Header>Map</Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <InputField
            type="text"
            label="Location"
            {...register("location", {
              required: "Location is required",
            })}
            error={errors.location?.message}
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

export default Map;