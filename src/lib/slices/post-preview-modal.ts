// src/store/slices/postPreviewModalSlice.ts

import { createSlice } from '@reduxjs/toolkit'

type PostPreviewModalState = boolean

const initialState: PostPreviewModalState = false

const postPreviewModalSlice = createSlice({
  name: 'postPreviewModal',
  initialState,
  reducers: {
    showPostPreviewModal: () => true,
    hidePostPreviewModal: () => false,
  },
})

export const {
  showPostPreviewModal,
  hidePostPreviewModal,
} = postPreviewModalSlice.actions

export default postPreviewModalSlice.reducer