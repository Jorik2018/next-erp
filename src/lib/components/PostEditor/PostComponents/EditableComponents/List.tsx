"use client";

import { FormEvent, useState } from "react";

import { LIST } from "@/lib/constants/post-content/components";
import {
  Form,
  Input,
  InputGroup,
  InputLabel,
} from "@/lib/components/Form";
import { Body, Footer, Header } from "@/lib/components/Card";
import { Button, CircleButton } from "@/lib/ui/button";

interface ListItem {
  id: string;
  data: string;
}

interface ListData {
  description: string;
  items: string[];
}

interface BaseListProps {
  order: number;
}

interface AddListProps extends BaseListProps {
  useToAddComponent: true;

  hideAddPostComponentModal: () => void;

  addNewPostComponent: (component: {
    type: typeof LIST;
    data: ListData;
    order: number;
  }) => void;
}

interface EditListProps extends BaseListProps {
  useToAddComponent: false;

  hideEditPostComponentModal: () => void;

  editPostComponent: (component: {
    newData: ListData;
    type: typeof LIST;
    order: number;
  }) => void;
}

type ListProps = AddListProps | EditListProps;

export default function List(props: ListProps) {
  const [description, setDescription] = useState("");
  const [itemToAdd, setItemToAdd] = useState("");
  const [items, setItems] = useState<ListItem[]>([]);

  const removeItem = (id: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const addItem = () => {
    const value = itemToAdd.trim();

    if (!value) {
      return;
    }

    setItems((currentItems) => [
      ...currentItems,
      {
        id: crypto.randomUUID(),
        data: value,
      },
    ]);

    setItemToAdd("");
  };

  const getListData = (): ListData => ({
    description: description.trim(),
    items: items.map((item) => item.data),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = getListData();

    if (props.useToAddComponent) {
      props.addNewPostComponent({
        type: LIST,
        data,
        order: props.order,
      });

      props.hideAddPostComponentModal();
      return;
    }

    props.editPostComponent({
      newData: data,
      type: LIST,
      order: props.order,
    });

    props.hideEditPostComponentModal();
  };

  const hideThisModal = props.useToAddComponent
    ? props.hideAddPostComponentModal
    : props.hideEditPostComponentModal;

  return (
    <>
      <Header>List</Header>

      <Form onSubmit={handleSubmit}>
        <Body>
          <InputGroup>
            <InputLabel>
              What is this list about?
            </InputLabel>

            <Input
              type="text"
              name="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
            />
          </InputGroup>

          <ol>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  position: "relative",
                  width: "90%",
                  padding: "1.5em",
                }}
              >
                {item.data}

                <CircleButton
                  variant="destructive"
                  type="button"
                  position="absolute"
                  top="1em"
                  right="-4em"
                  onClick={() => removeItem(item.id)}
                >
                  -
                </CircleButton>
              </li>
            ))}

            <Input
              name="itemToAdd"
              value={itemToAdd}
              onChange={(event) =>
                setItemToAdd(event.target.value)
              }
            />

            <Button
              variant="primary"
              type="button"
              className="mt-4 w-[90%]"
              onClick={addItem}
            >
              + Add Item
            </Button>
          </ol>
        </Body>

        <Footer>
          <Button
            variant="primary"
            type="submit"
            className="mr-2"
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