import Link from "next/link";

import ActivityPanel from "../ActivityPanel";
import { EDIT_POST_PAGE } from "@/constants/endpoints/ui";

interface PostActivityPanelProp {
  showPostRMModal: any
};

const PostActivityPanel = ({ showPostRMModal }: PostActivityPanelProp) => (
  <ActivityPanel>
    <Link
      href={{ pathname: EDIT_POST_PAGE, query: { id: "1525651231" } }}
      prefetch
    >
      <a>แก้ไขเนื้อหาโพส</a>
    </Link>
    <a onClick={() => showPostRMModal()}>ลบโพส</a>
  </ActivityPanel>
);

export default PostActivityPanel;
