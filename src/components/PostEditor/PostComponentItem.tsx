import type { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const PostComponentItemWrapper = styled.div`
  display: inline-block;
  width: 45%;
  padding: 1em;
  margin: 0.5em 0.3em;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  font-size: 1.4em;
  font-weight: 400;
  color: ${({ theme }) => theme.PRIMARY_COLOR};
  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

interface PostComponentItemProps
  extends ComponentPropsWithoutRef<'div'> {
  name: string
}

/**
 * @name PostComponentItem
 * @desc Displays an available component that can be added to a post.
 */
const PostComponentItem = ({
  name,
  ...props
}: PostComponentItemProps) => (
  <PostComponentItemWrapper {...props}>
    {name}
  </PostComponentItemWrapper>
)

export default PostComponentItem