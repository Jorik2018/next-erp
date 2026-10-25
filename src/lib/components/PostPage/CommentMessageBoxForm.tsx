import { Button } from '@/lib/ui/button'
import { Form, TextArea } from '../Form'

/**
 * @name CommentMessageForm
 * @desc A form to send a comment to a particular post
 */
const CommentMessageForm = () => (
  <Form>
    <TextArea
      style={{
        marginBottom: '1em',
        width: '100%',
        height: '100px'
      }}
    />

    <Button $primary $textCenter $fluidWidth>
      Send
    </Button>
  </Form>
)

export default CommentMessageForm