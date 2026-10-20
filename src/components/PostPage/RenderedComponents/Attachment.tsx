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
    color: ${({ theme }) => theme.PRIMARY_COLOR};
  }
`

const FileImage = styled.img`
  background-color: #ddd;
  width: 100%;
  height: 200px;
`

interface AttachmentProps {
  filename: string
  size: string | number
  type: string
}

/**
 * @name Attachment
 * @desc Used to display an available file attachment for a particular post
 */
const Attachment = ({
  filename,
  size,
  type
}: AttachmentProps) => (
  <AttachmentCard>
    <FileImage src="" alt="" />

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

    <Button $primary $fluidWidth $textCenter>
      ดาวน์โหลด
    </Button>
  </AttachmentCard>
)

export default Attachment