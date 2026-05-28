'use client'

import styled from 'styled-components'

import Card from '../Card'

const CommentCreatorPic = styled.img`
  display: inline-block;

  float: left;

  width: 60px;
  height: 60px;

  border: none;
  border-radius: 50%;

  background-color: #ccc;

  margin-top: 0.5em;
  margin-right: 1.5em;
`

const CommentInfo = styled.div`
  padding-left: 5em;
`

const CreatorName = styled.h4`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};

  font-weight: 500;
  font-size: 1.1em;

  margin-bottom: 0;
`

const CommentBody = styled.p`
  margin: 0;

  color: #777;

  font-size: 1em;
`

const ReplyButton = styled.button`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};

  background: transparent;

  border: none;

  font-size: 0.9em;

  margin-top: 0.3em;

  cursor: pointer;
`

const CommentCard = styled(Card)`
  box-shadow: none;

  padding: 1em 1em 1.8em 1em;

  margin-bottom: 0.5em;

  width: 100%;
  max-width: 100%;

  &:hover {
    background: #f5f5f5;
  }
`

type CommentItemProps = {
  creator: string
  content: string
  isReply?: boolean
  creatorImage?: string
}

export default function CommentItem({
  creator,
  content,
  isReply = false,
  creatorImage,
}: CommentItemProps) {
  return (
    <CommentCard>
      <CommentCreatorPic src={creatorImage} />

      <CommentInfo>
        <CreatorName>{creator}</CreatorName>

        <CommentBody>{content}</CommentBody>

        {!isReply && <ReplyButton>ตอบกลับ</ReplyButton>}
      </CommentInfo>
    </CommentCard>
  )
}