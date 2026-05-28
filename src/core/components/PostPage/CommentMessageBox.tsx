'use client'

import styled from 'styled-components'

import CommentMessageBoxForm from './CommentMessageBoxForm'
import Card, { Header, Body } from '../Card'

const CommentMessageBoxCard = styled(Card)`
  max-width: 900px;
  margin-bottom: 6em;
`

export default function CommentMessageBox() {
  return (
    <CommentMessageBoxCard>
      <Header>แสดงความคิดเห็นของคุณ</Header>

      <Body>
        <CommentMessageBoxForm />
      </Body>
    </CommentMessageBoxCard>
  )
}