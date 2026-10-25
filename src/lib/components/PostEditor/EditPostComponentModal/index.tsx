import {
  ModalBackground,
  ModalPanel,
} from "@/lib/components/Modal";

import EditPostComponentDetailForm from "./EditPostComponentDetailForm";

import type {
  EditPostComponentModalState,
} from "@/lib/slices/edit-post-component-modal";

import type {
  EditPostComponentPayload,
} from "@/types/post-component-editor";

interface EditPostComponentModalProps {
  hideEditPostComponentModal: () => void;

  editPostComponentModal:
    EditPostComponentModalState;

  editPostComponent: (
    component: EditPostComponentPayload
  ) => void;
}

const EditPostComponentModal = ({
  hideEditPostComponentModal,
  editPostComponentModal,
  editPostComponent,
}: EditPostComponentModalProps) => (
  <ModalBackground
    $show={editPostComponentModal.isShowing}
    style={{ zIndex: 100 }}
  >
    <ModalPanel
      style={{
        maxWidth: "1200px",
      }}
    >
      <EditPostComponentDetailForm
        order={editPostComponentModal.order}
        type={editPostComponentModal.type}
        editPostComponent={editPostComponent}
        hideEditPostComponentModal={
          hideEditPostComponentModal
        }
      />
    </ModalPanel>
  </ModalBackground>
);

export default EditPostComponentModal;