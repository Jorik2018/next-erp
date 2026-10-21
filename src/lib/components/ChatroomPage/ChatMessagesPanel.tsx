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

interface MessageWrapperProps {
  $isMine?: boolean
}

const MessageWrapper = styled.div<MessageWrapperProps>`
  text-align: ${({ $isMine }) => ($isMine ? 'right' : 'left')};
`

interface ChatMessageIndicatorProps {
  creator: string
  content: string
  isBelongsToCurrentUser: boolean
  id: number
}

/**
 * @name ChatMessageIndicator
 * @desc Determines whether to align the message to the left or right
 * depending on whether it belongs to the current user.
 */
const ChatMessageIndicator = ({
  creator,
  content,
  isBelongsToCurrentUser,
  id
}: ChatMessageIndicatorProps) => (
  <MessageWrapper $isMine={isBelongsToCurrentUser}>
    <ChatMessage
      creator={creator}
      content={content}
    />
  </MessageWrapper>
)

/**
 * @name ChatMessagesPanel
 * @desc Display chat messages and a form to send a new message
 */
const ChatMessagesPanel = () => (
  <ChatMessagesPanelWrapper>
    <Header>ห้องแชท</Header>

    <Body style={{ overflowY: 'scroll', height: '550px' }}>
      {[0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0].map((n, i) => (
        <ChatMessageIndicator
          creator="tiravat"
          content="ฟหกฟหกฟหกฟหกฟหกฟหมกนาฟดรกหาดสฟมดยำดใยฟหกใดยสกฟฟดสกหยดสหกด"
          isBelongsToCurrentUser={n === 1}
          id={i}
          key={i}
        />
      ))}
    </Body>

    <Footer>
      <Form>
        <TextArea
          style={{
            marginBottom: '1em',
            width: '100%',
            height: '50px'
          }}
        />

        <Button $primary $textCenter $fluidWidth>
          ส่ง
        </Button>
      </Form>
    </Footer>
  </ChatMessagesPanelWrapper>
)

export default ChatMessagesPanel