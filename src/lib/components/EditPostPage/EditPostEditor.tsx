'use client'

import PostEditor from '@/lib/components/PostEditor/PostEditor'

interface EditPostEditorProps {
  postID: string
}

const EditPostEditor = ({
  postID
}: EditPostEditorProps) => {
  return (
    <PostEditor
      postID={postID}
    />
  )
}

export default EditPostEditor