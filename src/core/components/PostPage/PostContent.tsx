'use client'

import { renderPostComponent } from '../../helpers/post'
import PostContentWrapper from './PostContentWrapper'

type PostContentProps = {
  recipe: string
}

export default function PostContent({
  recipe,
}: PostContentProps) {
  let parsedRecipe = null

  try {
    parsedRecipe = JSON.parse(recipe)
  } catch {
    return (
      <PostContentWrapper>
        <p>Invalid post content</p>
      </PostContentWrapper>
    )
  }

  return (
    <PostContentWrapper>
      {renderPostComponent(parsedRecipe)}
    </PostContentWrapper>
  )
}