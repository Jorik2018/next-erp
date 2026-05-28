'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializePost } from '../../reducers/editing-post-receipe'
import PostEditor from '../PostEditor/PostEditor'

export default function EditPostEditor() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializePost())
  }, [dispatch])

  return <PostEditor />
}