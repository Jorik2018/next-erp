'use client'

import styled from 'styled-components'

import Card, { Header, Body } from '../Card'
import PostCommentItem from './PostCommentItem'

const SubCommentsWrapper = styled.ul`
  padding-left: 5em;
  list-style: none;
`

const CommentPanelCard = styled(Card)`
  padding-bottom: 4em;
  margin-bottom: 2em;
  max-width: 100%;
  height: 500px;
  width: 900px;
`

type SubComment = {
  message: string
  creator: {
    fname: string
  }
}

export type CommentType = {
  message: string
  creator: {
    fname: string
  }
  subComments?: SubComment[]
}

type CommentProps = {
  creator: string
  content: string
  subComments?: SubComment[]
}

function Comment({ creator, content, subComments = [] }: CommentProps) {
  return (
    <div>
      <PostCommentItem creator={creator} content={content} />

      <SubCommentsWrapper>
        {subComments.map((comment, index) => (
          <PostCommentItem
            key={`${comment.creator.fname}-${index}`}
            isReply
            content={comment.message}
            creator={comment.creator.fname}
          />
        ))}
      </SubCommentsWrapper>
    </div>
  )
}

type PostCommentsPanelProps = {
  comments?: CommentType[]
}

export default function PostCommentsPanel({
  comments = [],
}: PostCommentsPanelProps) {
  return (
    <CommentPanelCard>
      <Header>ความคิดเห็น</Header>

      <Body $overflowY="auto" $height="450px">
        {!comments.length ? (
          <Card $padding="2em 4em" $marginTop="3em" $textCenter>
            <h3>ยังไม่มีความคิดเห็นใดๆ</h3>
          </Card>
        ) : (
          comments.map((comment, index) => (
            <Comment
              key={`${comment.creator.fname}-${index}`}
              content={comment.message}
              creator={comment.creator.fname}
              subComments={comment.subComments}
            />
          ))
        )}
      </Body>
    </CommentPanelCard>
  )
}