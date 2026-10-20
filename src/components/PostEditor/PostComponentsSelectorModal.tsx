import { ModalBackground, ModalPanel } from '../../Modal'
import PostComponentItem from './PostComponentItem'
import { Header, Body, Footer } from '../../Card'
import { Button } from '../../Button'

import {
  SUB_HEADING,
  SLIDE_SHOW,
  ATTACHMENT,
  PARAGRAPH,
  HEADING,
  TABLE,
  IMAGE,
  VIDEO,
  LIST,
  MAP
} from '../../../constants/post-content/components'

const components = [
  { type: HEADING, name: 'Heading' },
  { type: SUB_HEADING, name: 'Subheading' },
  { type: PARAGRAPH, name: 'Paragraph' },
  { type: IMAGE, name: 'Image' },
  { type: LIST, name: 'List' },
  { type: VIDEO, name: 'Video' },
  { type: MAP, name: 'Map' },
  { type: TABLE, name: 'Table' },
  { type: SLIDE_SHOW, name: 'Image Slideshow' },
  { type: ATTACHMENT, name: 'Attachment' }
]

interface PostComponentsSelectorModalProps {
  isComponentsSelectorModalShowing: boolean
  hideComponentsSelectorModal: () => void
  showAddPostComponentModal: (type: string) => void
}

/**
 * @name PostComponentsSelectorModal
 * @desc Displays a modal for selecting a post component.
 */
const PostComponentsSelectorModal = ({
  isComponentsSelectorModalShowing,
  hideComponentsSelectorModal,
  showAddPostComponentModal
}: PostComponentsSelectorModalProps) => (
  <ModalBackground $show={isComponentsSelectorModalShowing}>
    <ModalPanel $large>
      <Header>Select a component</Header>

      <Body
        $height="470px"
        style={{ textAlign: 'center' }}
      >
        {components.map(component => (
          <PostComponentItem
            key={component.type}
            name={component.name}
            onClick={() =>
              showAddPostComponentModal(component.type)
            }
          />
        ))}
      </Body>

      <Footer>
        <Button
          $light
          $textCenter
          type="button"
          onClick={hideComponentsSelectorModal}
        >
          Cancel
        </Button>
      </Footer>
    </ModalPanel>
  </ModalBackground>
)

export default PostComponentsSelectorModal