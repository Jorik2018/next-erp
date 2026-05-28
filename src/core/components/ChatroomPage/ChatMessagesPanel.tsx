'use client'

import styled from 'styled-components'

import Card, { Header, Body, Footer } from '../Card'
import { Form, TextArea } from '../Form'
import ChatMessage from './ChatMessage'
import { Button } from '../Button'

const ChatMessagesPanelWrapper = styled(Card)`
  height: auto;
  max-width: 100%;
  width: 1000px;
`

type MessageWrapperProps = {
  $isMine?: boolean
}

const MessageWrapper = styled.div<MessageWrapperProps>`
  text-align: ${p => (p.$isMine ? 'right' : 'left')};
`

type ChatMessageIndicatorProps = {
  creator: string
  content: string
  isBelongsToCurrentUser: boolean
  id: string | number
}

function ChatMessageIndicator({
  creator,
  content,
  isBelongsToCurrentUser,
  id,
}: ChatMessageIndicatorProps) {
  return (
    <MessageWrapper $isMine={isBelongsToCurrentUser}>
      <ChatMessage
        key={id}
        creator={creator}
        content={content}
      />
    </MessageWrapper>
  )
}

export default function ChatMessagesPanel() {
  return (
    <ChatMessagesPanelWrapper>
      <Header>ห้องแชท</Header>

      <Body
        $overflowY="scroll"
        $height="550px"
      >
        {[0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0].map((n, i) => (
          <ChatMessageIndicator
            key={i}
            id={i}
            creator="tiravat"
            content="ฟหกฟหกฟหกฟหกฟหกฟหมกนาฟดรกหาดสฟมดยำดใยฟหกใดยสกฟฟดสกหยดสหกด"
            isBelongsToCurrentUser={Boolean(n)}
          />
        ))}
      </Body>

      <Footer>
        <Form>
          <TextArea
            style={{
              marginBottom: '1em',
              width: '100%',
              height: '50px',
            }}
          />

          <Button
            $primary
            $textCenter
            $fluidWidth
          >
            ส่ง
          </Button>
        </Form>
      </Footer>
    </ChatMessagesPanelWrapper>
  )
}