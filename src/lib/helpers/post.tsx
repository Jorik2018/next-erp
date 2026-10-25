import BasedComponent from '@/lib/components/PostEditor/PostComponents/BasedComponent'
import Attachment from '@/lib/components/PostPage/RenderedComponents/Attachment'
import Heading from '@/lib/components/PostPage/RenderedComponents/Heading'
import Image from '@/lib/components/PostPage/RenderedComponents/Image'
import List from '@/lib/components/PostPage/RenderedComponents/List'
import Map from '@/lib/components/PostPage/RenderedComponents/Map'
import Paragraph from '@/lib/components/PostPage/RenderedComponents/Paragraph'
import Slideshow from '@/lib/components/PostPage/RenderedComponents/Slideshow'
import SubHeading from '@/lib/components/PostPage/RenderedComponents/SubHeading'
import Table from '@/lib/components/PostPage/RenderedComponents/Table'
import Video from '@/lib/components/PostPage/RenderedComponents/Video'

import {
  ATTACHMENT,
  HEADING,
  IMAGE,
  LIST,
  MAP,
  PARAGRAPH,
  SLIDE_SHOW,
  SUB_HEADING,
  TABLE,
  VIDEO
} from '@/lib/constants/post-content/components'

/* -------------------------------------------------------------------------- */
/*                                  Data Types                                */
/* -------------------------------------------------------------------------- */

export interface ListData {
  description: string
  items: string[]
}

export interface ImageData {
  url: string
  alt: string
}

export interface VideoData {
  url: string
}

export interface TableData {
  meta: {
    name: string
    description: string
  }

  head: string[]

  body: {
    items: {
      data: string
    }[]
  }[]
}

export interface SlideshowImage {
  id: string
  url: string
  alt: string
}

export interface MapData {
  location: string
}

export interface AttachmentData {
  filename: string
  size: string
  type: string
}

export type AddPostComponentModalState = {
  isShowing: boolean
  type: PostComponentType
}

/* -------------------------------------------------------------------------- */
/*                              Post Components                               */
/* -------------------------------------------------------------------------- */

export type PostComponent =
  | {
      type: typeof HEADING
      order: number
      data: string
      newData?: string
    }
  | {
      type: typeof SUB_HEADING
      order: number
      data: string
      newData?: string
    }
  | {
      type: typeof PARAGRAPH
      order: number
      data: string
      newData?: string
    }
  | {
      type: typeof VIDEO
      order: number
      data: VideoData
      newData?: VideoData
    }
  | {
      type: typeof IMAGE
      order: number
      data: ImageData
      newData?: ImageData
    }
  | {
      type: typeof LIST
      order: number
      data: ListData
      newData?: ListData
    }
  | {
      type: typeof TABLE
      order: number
      data: TableData
      newData?: TableData
    }
  | {
      type: typeof SLIDE_SHOW
      order: number
      data: SlideshowImage[]
      newData?: SlideshowImage[]
    }
  | {
      type: typeof MAP
      order: number
      data: MapData
      newData?: MapData
    }
  | {
      type: typeof ATTACHMENT
      order: number
      data: AttachmentData
      newData?: AttachmentData
    }

export type PostComponentType =
  PostComponent['type']

/* -------------------------------------------------------------------------- */
/*                                  Renderer                                  */
/* -------------------------------------------------------------------------- */

const renderComponent = (
  component: PostComponent
) => {
  switch (component.type) {
    case HEADING:
      return (
        <Heading>
          {component.data}
        </Heading>
      )

    case SUB_HEADING:
      return (
        <SubHeading>
          {component.data}
        </SubHeading>
      )

    case PARAGRAPH:
      return (
        <Paragraph>
          {component.data}
        </Paragraph>
      )

    case VIDEO:
      return (
        <Video
          url={component.data.url}
        />
      )

    case IMAGE:
      return (
        <Image
          src={component.data.url}
          alt={component.data.alt}
        />
      )

    case LIST:
      return (
        <List
          description={
            component.data.description
          }
        >
          {component.data.items.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </List>
      )

    case TABLE:
      return (
        <Table
          name={
            component.data.meta.name
          }
          description={
            component.data.meta.description
          }
        >
          <thead>
            <tr>
              {component.data.head.map(
                (columnName, index) => (
                  <th key={index}>
                    {columnName}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {component.data.body.map(
              (row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.items.map(
                    (
                      item,
                      columnIndex
                    ) => (
                      <td
                        key={
                          columnIndex
                        }
                      >
                        {item.data}
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </Table>
      )

    case SLIDE_SHOW:
      return (
        <Slideshow
          images={component.data}
        />
      )

    case MAP:
      return (
        <Map
          location={
            component.data.location
          }
        />
      )

    case ATTACHMENT:
      return (
        <Attachment
          filename={
            component.data.filename
          }
          size={
            component.data.size
          }
          type={
            component.data.type
          }
        />
      )
  }
}

/* -------------------------------------------------------------------------- */
/*                              Editable Renderer                             */
/* -------------------------------------------------------------------------- */

type RemovePostComponent = (
  order: number
) => void

type ShowEditPostComponentModal = (
  type: PostComponentType,
  order: number
) => void

/**
 * @name renderEditableComponent
 * @desc Render post components from a recipe in the post editor.
 */
export const renderEditableComponent = (
  recipe: PostComponent[],
  removePostComponent: RemovePostComponent,
  showEditPostComponentModal: ShowEditPostComponentModal
) => {
  if (!recipe?.length) {
    return null
  }

  return recipe.map(component => (
    <BasedComponent
      key={component.order}
      type={component.type}
      order={component.order}
      removePostComponent={
        removePostComponent
      }
      showEditPostComponentModal={
        showEditPostComponentModal
      }
    >
      {renderComponent(component)}
    </BasedComponent>
  ))
}

/* -------------------------------------------------------------------------- */
/*                                Post Renderer                               */
/* -------------------------------------------------------------------------- */

/**
 * @name renderPostComponent
 * @desc Render components from a post recipe.
 */
export const renderPostComponent = (
  recipe: PostComponent[]
) => {
  if (!recipe?.length) {
    return null
  }

  return recipe.map(component => (
    <div key={component.order}>
      {renderComponent(component)}
    </div>
  ))
}

export type EditPostComponentPayload =
  PostComponent extends infer T
    ? T extends PostComponent
      ? {
          type: T["type"];
          order: T["order"];
          newData: T["data"];
        }
      : never
    : never;