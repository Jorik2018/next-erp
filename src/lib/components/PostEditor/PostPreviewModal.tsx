import {
  renderPostComponent,
  type PostComponent,
} from "@/helpers/post";

import {
  ModalBackground,
  ModalPanel,
} from "@/lib/components/Modal";

import {
  Header,
  Body,
  Footer,
} from "@/lib/components/Card";

import { Button } from "@/lib/components/Button";

interface PostPreviewModalProps {
  receipe: PostComponent[];
  isShowing: boolean;
  hidePostPreviewModal: () => void;
}

/**
 * @name PostPreviewModal
 * @desc Displays a preview of the post currently being edited.
 */
const PostPreviewModal = ({
  receipe,
  isShowing,
  hidePostPreviewModal,
}: PostPreviewModalProps) => (
  <ModalBackground $show={isShowing}>
    <ModalPanel
      style={{
        maxWidth: "1400px",
      }}
    >
      <Header>Preview</Header>

      <Body
        style={{
          paddingTop: "5em",
          paddingBottom: "5em",
        }}
      >
        {renderPostComponent(receipe)}
      </Body>

      <Footer>
        <Button
          variant="primary"
          type="button"
          onClick={() => alert("Saving")}
        >
          Save
        </Button>

        <Button
          variant="light"
          type="button"
          onClick={hidePostPreviewModal}
        >
          Close
        </Button>
      </Footer>
    </ModalPanel>
  </ModalBackground>
);

export default PostPreviewModal;