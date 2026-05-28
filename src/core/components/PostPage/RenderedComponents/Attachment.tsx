'use client'

import styled from 'styled-components'

import { Button } from '../../Button'
import Card from '../../Card'

const AttachmentCard = styled(Card)`
  max-width: 400px;

  margin-top: 3em;
  margin-bottom: 0;
  margin-left: 0.7em;
  margin-right: 0.7em;

  padding: 1em;

  display: inline-block;
`

const FileInfoWrapper = styled.div`
  display: inline-block;

  margin-top: 1em;
  margin-bottom: 1em;
`

const FileInfo = styled.h4`
  display: block;
  color: #777;

  span {
    color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  }
`

const FileImage = styled.img`
  width: 100%;
  height: 200px;

  background-color: #ddd;

  object-fit: cover;
`

type AttachmentProps = {
  filename: string
  size: number
  type: string
  imageSrc?: string
}

export default function Attachment({
  filename,
  size,
  type,
  imageSrc,
}: AttachmentProps) {
  return (
    <AttachmentCard>
      <FileImage src={imageSrc ?? ''} alt={filename} />

      <FileInfoWrapper>
        <FileInfo>
          File name: <span>{filename}</span>
        </FileInfo>

        <FileInfo>
          File size: <span>{size}</span>
        </FileInfo>

        <FileInfo>
          File type: <span>{type}</span>
        </FileInfo>
      </FileInfoWrapper>

      <Button $primary $fluidWidth>
        ดาวน์โหลด
      </Button>
    </AttachmentCard>
  )
}