'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PostEditor from '@/lib/components/PostEditor/PostEditor'
import { initializePost } from '@/lib/slices/editing-post-receipe'

const EditPostEditor = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializePost())
  }, [dispatch])

  return <PostEditor classroomID='123-mock' />
}

export default EditPostEditor