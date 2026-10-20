'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PostEditor from '../components/PostEditor/PostEditor'
import { initializePost } from '@/lib/slices/editing-post-receipe'

/**
 * @name EditPostEditor
 * @desc Initializes the post recipe and displays the post editor.
 */
const EditPostEditor = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializePost())
  }, [dispatch])

  return <PostEditor />
}

export default EditPostEditor