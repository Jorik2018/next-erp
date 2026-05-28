import type { ReactNode } from 'react'

import BasedComponent from '@/core/components/PostEditor/PostComponents/BasedComponent'
import SubHeading from '@/core/components/PostPage/RenderedComponents/SubHeading'
import Attachment from '@/core/components/PostPage/RenderedComponents/Attachment'
import Paragraph from '@/core/components/PostPage/RenderedComponents/Paragraph'
import Slideshow from '@/core/components/PostPage/RenderedComponents/Slideshow'
import Heading from '@/core/components/PostPage/RenderedComponents/Heading'
import Image from '@/core/components/PostPage/RenderedComponents/Image'
import Table from '@/core/components/PostPage/RenderedComponents/Table'
import Video from '@/core/components/PostPage/RenderedComponents/Video'
import List from '@/core/components/PostPage/RenderedComponents/List'
import Map from '@/core/components/PostPage/RenderedComponents/Map'

type PostComponentType =
  | 'HEADING'
  | 'VIDEO'
  | 'SUB_HEADING'
  | 'PARAGRAPH'
  | 'LIST'
  | 'IMAGE'
  | 'TABLE'
  | 'SLIDE_SHOW'
  | 'MAP'
  | 'ATTACHMENT'

export type PostComponent = {
  type: PostComponentType
  order: number
  data: any
}

type RendererProps = {
  component: PostComponent
}

const availableComponents: Record<
  PostComponentType,
  ({ component }: RendererProps) => ReactNode
> = {
  HEADING: ({ component }) => <Heading>{component.data}</Heading>,

  VIDEO: () => <Video />,

  SUB_HEADING: ({ component }) => (
    <SubHeading>{component.data}</SubHeading>
  ),

  PARAGRAPH: ({ component }) => (
    <Paragraph>{component.data}</Paragraph>
  ),

  LIST: ({ component }) => (
    <List description={component.data.description}>
      {component.data.items.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </List>
  ),

  IMAGE: ({ component }) => (
    <Image src={component.data.url} alt={component.data.alt} />
  ),

  TABLE: ({ component }) => (
    <Table
      name={component.data.meta.name}
      description={component.data.meta.description}
    >
      <thead>
        <tr>
          {component.data.head.map((columnName: string, index: number) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {component.data.body.map((rowGroup: any, rowIndex: number) => (
          <tr key={rowIndex}>
            {rowGroup.items.map((row: any, cellIndex: number) => (
              <td key={cellIndex}>{row.data}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  ),

  SLIDE_SHOW: ({ component }) => (
    <Slideshow images={component.data} />
  ),

  MAP: () => <Map />,

  ATTACHMENT: ({ component }) => (
    <Attachment
      filename={component.data.filename}
      size={component.data.size}
      type={component.data.type}
    />
  ),
}

export function renderEditableComponent(
  recipe: PostComponent[] | undefined | null,
  removePostComponent: (order: number) => void,
  showEditPostComponentModal: (component: PostComponent) => void,
) {
  if (!recipe?.length) {
    return null
  }

  return recipe.map(component => {
    const ComponentToRender = availableComponents[component.type]

    if (!ComponentToRender) {
      return null
    }

    return (
      <BasedComponent
        key={component.order}
        type={component.type}
        order={component.order}
        removePostComponent={removePostComponent}
        showEditPostComponentModal={showEditPostComponentModal}
      >
        <ComponentToRender component={component} />
      </BasedComponent>
    )
  })
}

export function renderPostComponent(recipe: PostComponent[] | undefined | null) {
  if (!recipe?.length) {
    return null
  }

  return recipe.map(component => {
    const ComponentToRender = availableComponents[component.type]

    if (!ComponentToRender) {
      return null
    }

    return (
      <ComponentToRender
        key={component.order}
        component={component}
      />
    )
  })
}