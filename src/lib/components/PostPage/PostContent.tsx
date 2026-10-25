
import { renderPostComponent } from '@/lib/helpers/post'
import PostContentWrapper from './PostContentWrapper'

interface PostContentProp {
  recipe: string
}
/**
 * @name PostContent
 * @desc Display post content
 * @prop { recipe } [APOLLO] : Post recipe
 */
const PostContent = ({ recipe }:PostContentProp) => (
  <PostContentWrapper>
    {renderPostComponent(JSON.parse(recipe))}
  </PostContentWrapper>
)

export default PostContent
