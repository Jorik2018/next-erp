import type { ComponentType } from 'react'

import SubHeading from '@/lib/components/PostPage/RenderedComponents/SubHeading'
import Video from '@/lib/components/PostPage/RenderedComponents/Video'
import {
  HEADING,
  VIDEO,
  SUB_HEADING,
  PARAGRAPH,
  LIST,
  IMAGE,
  TABLE,
  SLIDE_SHOW,
  MAP,
  ATTACHMENT
} from '@/lib/constants/post-content/components'
import Table from '@/lib/components/PostPage/RenderedComponents/Table'
import Slideshow from '@/lib/components/PostPage/RenderedComponents/Slideshow'
import Attachment from '@/lib/components/PostPage/RenderedComponents/Attachment'
import List from '@/lib/components/PostPage/RenderedComponents/List'
import Paragraph from '@/lib/components/PostPage/RenderedComponents/Paragraph'
import Heading from '@/lib/components/PostPage/RenderedComponents/Heading'
import Map from '@/lib/components/PostPage/RenderedComponents/Map'
import BasedComponent from '@/lib/components/PostEditor/PostComponents/BasedComponent'
import Image from '@/lib/components/PostPage/RenderedComponents/Image'

export type PostComponentType =
  | typeof HEADING
  | typeof VIDEO
  | typeof SUB_HEADING
  | typeof PARAGRAPH
  | typeof LIST
  | typeof IMAGE
  | typeof TABLE
  | typeof SLIDE_SHOW
  | typeof MAP
  | typeof ATTACHMENT

interface ListData {
  description: string
  items: string[]
}

interface ImageData {
  url: string
  alt: string
}

interface TableData {
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

interface SlideshowImage {
  id: string
  url: string
  alt: string
}

interface MapData {
  location: string
}

interface AttachmentData {
  filename: string
  size: string
  type: string
}

export interface PostComponent {
  type: PostComponentType
  order: number
  data:
    | string
    | ListData
    | ImageData
    | TableData
    | SlideshowImage[]
    | MapData
    | AttachmentData
}

interface RenderComponentProps {
  component: PostComponent
}

const availableComponents: Record<
  PostComponentType,
  ComponentType<RenderComponentProps>
> = {
  [HEADING]: ({ component }) => (
    <Heading>{component.data as string}</Heading>
  ),

  [VIDEO]: () => <Video />,

  [SUB_HEADING]: ({ component }) => (
    <SubHeading>
      {component.data as string}
    </SubHeading>
  ),

  [PARAGRAPH]: ({ component }) => (
    <Paragraph>
      {component.data as string}
    </Paragraph>
  ),

  [LIST]: ({ component }) => {
    const data = component.data as ListData

    return (
      <List description={data.description}>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </List>
    )
  },

  [IMAGE]: ({ component }) => {
    const data = component.data as ImageData

    return (
      <Image
        src={data.url}
        alt={data.alt}
      />
    )
  },

  [TABLE]: ({ component }) => {
    const data = component.data as TableData

    return (
      <Table
        name={data.meta.name}
        description={data.meta.description}
      >
        <thead>
          <tr>
            {data.head.map((columnName, index) => (
              <th key={index}>
                {columnName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.body.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.items.map((item, columnIndex) => (
                <td key={columnIndex}>
                  {item.data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    )
  },

  [SLIDE_SHOW]: ({ component }) => (
    <Slideshow
      images={component.data as SlideshowImage[]}
    />
  ),

  [MAP]: ({ component }) => {
    const data = component.data as MapData

    return (
      <Map location={data.location} />
    )
  },

  [ATTACHMENT]: ({ component }) => {
    const data = component.data as AttachmentData

    return (
      <Attachment
        filename={data.filename}
        size={data.size}
        type={data.type}
      />
    )
  }
}

type RemovePostComponent = (order: number) => void

type ShowEditPostComponentModal = (
  type: PostComponentType,
  order: number
) => void

/**
 * @name renderEditableComponent
 * @desc Render post components from a recipe in the post editor.
 */
export const renderEditableComponent = (
  receipe: PostComponent[],
  removePostComponent: RemovePostComponent,
  showEditPostComponentModal: ShowEditPostComponentModal
) => {
  if (!receipe?.length) {
    return null
  }

  return receipe.map(component => {
    const ComponentToRender =
      availableComponents[component.type]

    return (
      <BasedComponent
        key={component.order}
        type={component.type}
        order={component.order}
        removePostComponent={removePostComponent}
        showEditPostComponentModal={
          showEditPostComponentModal
        }
      >
        <ComponentToRender component={component} />
      </BasedComponent>
    )
  })
}

/**
 * @name renderPostComponent
 * @desc Render components in a given recipe.
 */
export const renderPostComponent = (
  receipe: PostComponent[]
) => {
  if (!receipe?.length) {
    return null
  }

  return receipe.map(component => {
    const ComponentToRender =
      availableComponents[component.type]

    return (
      <ComponentToRender
        key={component.order}
        component={component}
      />
    )
  })
}
