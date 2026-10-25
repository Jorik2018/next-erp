import Link from "next/link";

import ActivityPanel from "../ActivityPanel";
import { POST_PAGE } from "@/lib/constants/endpoints/ui";

interface PostActivityPanelProps {
  postId: string;
  showPostRMModal: () => void;
}

const PostActivityPanel = ({
  postId,
  showPostRMModal,
}: PostActivityPanelProps) => (
  <ActivityPanel>
    <Link
      href={{
        pathname: `${POST_PAGE}/${postId}/edit`,
      }}
    >
      Edit Post
    </Link>

    <button
      type="button"
      onClick={showPostRMModal}
    >
      Delete Post
    </button>
  </ActivityPanel>
);

export default PostActivityPanel;