import Link from 'next/link'
import styled from 'styled-components'

import { POST_PAGE } from '../constants/endpoints/ui'
import Card from './Card'

const PostListItemCard = styled(Card)`
  margin: 0 auto 1.5em;
  padding: 2em 2em 2em 4em;
  text-align: center;
  box-shadow: none;
  cursor: pointer;
  max-width: 90%;
  transition: 150ms ease-in;
  color: #777;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
    color: ${({ theme }) => theme.PRIMARY_COLOR};
  }
`

const PostTitle = styled.h3`
  font-weight: 400;
  font-size: 1.3em;
`

interface PostsListWrapperProps {
  $height?: string
}

const PostsListWrapper = styled.div<PostsListWrapperProps>`
  height: ${({ $height }) => $height || '600px'};
  overflow-y: auto;
  margin-top: 1.5em;
`

interface PostListItemProps {
  title: string
  _id: string
}

/**
 * @name PostListItem
 * @desc Displays a single post item.
 */
const PostListItem = ({
  title,
  _id
}: PostListItemProps) => (
  <Link
    href={{
      pathname: POST_PAGE,
      query: { id: _id }
    }}
    prefetch
  >
    <PostListItemCard>
      <PostTitle>
        {title.length > 55
          ? `${title.slice(0, 52)}...`
          : title}
      </PostTitle>
    </PostListItemCard>
  </Link>
)

interface Post {
  _id: string
  title: string
}

interface PostsListProps {
  posts: Post[]
  height?: string,
  classroomID?: string
}

/**
 * @name PostsList
 * @desc Displays posts associated with a classroom.
 */
const PostsList = ({
  posts,
  height
}: PostsListProps) => (
  <PostsListWrapper $height={height}>
    {posts.length > 0 ? (
      posts.map(post => (
        <PostListItem
          key={post._id}
          _id={post._id}
          title={post.title}
        />
      ))
    ) : (
      <Card
        $padding="2em 4em"
        $marginTop="3em"
        $textCenter
      >
        <h3>No posts yet.</h3>
      </Card>
    )}
  </PostsListWrapper>
)

export default PostsList