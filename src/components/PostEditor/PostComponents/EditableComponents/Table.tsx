"use client";

import { type FormEvent, useState } from "react";

import { TABLE } from "@/constants/post-content/components";
import TableWrapper from "../../../PostPage/RenderedComponents/Table";
import { Header, Body, Footer } from "@/components/Card";
import {
  Form,
  Input,
  InputLabel,
  InputGroup,
} from "@/components/Form";
import { Button, CircleButton } from "@/components/Button";

interface TableMeta {
  name: string;
  description: string;
}

interface TableRowItem {
  data: string;
  column: string;
}

interface TableRow {
  id: string;
  items: TableRowItem[];
}

interface TableData {
  meta: TableMeta;
  head: string[];
  body: TableRow[];
}

interface BaseTableProps {
  order: number;
}

interface AddTableProps extends BaseTableProps {
  useToAddComponent: true;

  hideAddPostComponentModal: () => void;

  addNewPostComponent: (component: {
    type: typeof TABLE;
    order: number;
    data: TableData;
  }) => void;
}

interface EditTableProps extends BaseTableProps {
  useToAddComponent: false;

  hideEditPostComponentModal: () => void;

  editPostComponent: (component: {
    type: typeof TABLE;
    order: number;
    newData: TableData;
  }) => void;
}

type TableProps = AddTableProps | EditTableProps;

export default function Table(props: TableProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [columnToAdd, setColumnToAdd] = useState("");
  const [head, setHead] = useState<string[]>([]);
  const [body, setBody] = useState<TableRow[]>([]);

  const [rowDraft, setRowDraft] = useState<
    Record<string, string>
  >({});

  const addColumnItem = () => {
    const column = columnToAdd.trim();

    if (!column || head.includes(column)) {
      return;
    }

    setHead((currentHead) => [
      ...currentHead,
      column,
    ]);

    setRowDraft((current) => ({
      ...current,
      [column]: "",
    }));

    setColumnToAdd("");
  };

  const addRowItem = () => {
    if (head.length === 0) {
      return;
    }

    const items: TableRowItem[] = head.map(
      (column) => ({
        column,
        data: rowDraft[column] ?? "",
      })
    );

    setBody((currentBody) => [
      ...currentBody,
      {
        id: crypto.randomUUID(),
        items,
      },
    ]);

    setRowDraft(
      Object.fromEntries(
        head.map((column) => [column, ""])
      )
    );
  };

  const removeRowItem = (id: string) => {
    setBody((currentBody) =>
      currentBody.filter((row) => row.id !== id)
    );
  };

  const getTableData = (): TableData => ({
    meta: {
      name: name.trim(),
      description: description.trim(),
    },
    head,
    body,
  });

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (head.length === 0 || body.length === 0) {
      return;
    }

    const data = getTableData();

    if (props.useToAddComponent) {
      props.addNewPostComponent({
        type: TABLE,
        order: props.order,
        data,
      });

      props.hideAddPostComponentModal();
      return;
    }

    props.editPostComponent({
      type: TABLE,
      order: props.order,
      newData: data,
    });

    props.hideEditPostComponentModal();
  };

  const hideThisModal = props.useToAddComponent
    ? props.hideAddPostComponentModal
    : props.hideEditPostComponentModal;

  return (
    <>
      <Header>Table</Header>

      <Form onSubmit={handleSubmit}>
        <Body>
          <InputGroup>
            <InputLabel>Table name</InputLabel>

            <Input
              name="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              Table description
            </InputLabel>

            <Input
              name="description"
              type="text"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
            />
          </InputGroup>

          <TableWrapper
            description={description}
            name={name}
          >
            <thead>
              <tr>
                <th>#</th>

                {head.map((column) => (
                  <th key={column}>
                    {column}
                  </th>
                ))}

                <th>
                  <Input
                    type="text"
                    name="newColumn"
                    value={columnToAdd}
                    placeholder="Enter column name"
                    onChange={(event) =>
                      setColumnToAdd(
                        event.target.value
                      )
                    }
                  />
                </th>

                <th>
                  <CircleButton
                    variant="primary"
                    size="icon"
                    type="button"
                    onClick={addColumnItem}
                  >
                    +
                  </CircleButton>
                </th>
              </tr>
            </thead>

            <tbody>
              {body.map((row, rowIndex) => (
                <tr key={row.id}>
                  <td>{rowIndex + 1}</td>

                  {row.items.map((item) => (
                    <td
                      key={`${row.id}-${item.column}`}
                    >
                      {item.data}
                    </td>
                  ))}

                  <td />

                  <td>
                    <CircleButton
                      variant="destructive"
                      size="icon"
                      type="button"
                      onClick={() =>
                        removeRowItem(row.id)
                      }
                    >
                      -
                    </CircleButton>
                  </td>
                </tr>
              ))}

              {head.length > 0 && (
                <tr>
                  <td />

                  {head.map((column) => (
                    <td key={column}>
                      <Input
                        type="text"
                        name={column}
                        value={
                          rowDraft[column] ?? ""
                        }
                        onChange={(event) =>
                          setRowDraft(
                            (current) => ({
                              ...current,
                              [column]:
                                event.target.value,
                            })
                          )
                        }
                      />
                    </td>
                  ))}

                  <td />

                  <td>
                    <CircleButton
                      variant="primary"
                      size="icon"
                      type="button"
                      onClick={addRowItem}
                    >
                      +
                    </CircleButton>
                  </td>
                </tr>
              )}
            </tbody>
          </TableWrapper>
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