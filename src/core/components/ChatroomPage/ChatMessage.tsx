'use client'

import styled from 'styled-components'

import Card from '../Card'

type ChatMessageProps = {
  creator: string
  content: string
}

const ChatMessageCreatorPic = styled.img`
  display: inline-block;

  float: left;

  width: 60px;
  height: 60px;

  margin-top: 0.5em;
  margin-right: 1.5em;

  border: none;
  border-radius: 50%;

  background-color: #ccc;
`

const ChatMessageInfo = styled.div`
  padding-left: 5em;
`

const Creator = styled.h4`
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};

  font-weight: 500;
  font-size: 1.1em;

  margin-bottom: 0;
`

const Content = styled.p`
  margin: 0;

  color: #777;

  font-family: Arial, sans-serif;
`

const ChatMessageCard = styled(Card)`
  display: inline-block;

  max-width: 450px;

  margin-bottom: 1em;

  padding: 1em 1em 1.8em 1em;

  box-shadow: none;

  &:hover {
    background: #f5f5f5;
  }
`

export default function ChatMessage({
  creator,
  content,
}: ChatMessageProps) {
  return (
    <ChatMessageCard>
      <ChatMessageCreatorPic />

      <ChatMessageInfo>
        <Creator>{creator}</Creator>

        <Content>{content}</Content>
      </ChatMessageInfo>
    </ChatMessageCard>
  )
}