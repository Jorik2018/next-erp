import styled from 'styled-components'

import CommentMessageBoxForm from './CommentMessageBoxForm'
import Card, { Header, Body } from '../Card'

const CommentMessageBoxCard = styled(Card)`
  max-width: 900px;
  margin-bottom: 6em;
`

/**
 * @name CommentMessageBox
 * @desc Send a new comment to a particular post
 */
const CommentMessageBox = () => (
  <CommentMessageBoxCard>
    <Header>Leave a Comment</Header>

    <Body>
      <CommentMessageBoxForm />
    </Body>
  </CommentMessageBoxCard>
)

export default CommentMessageBox