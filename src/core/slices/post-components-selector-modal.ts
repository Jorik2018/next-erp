// src/store/slices/postComponentsSelectorModalSlice.ts

import { createSlice } from '@reduxjs/toolkit'

type PostComponentsSelectorModalState = boolean

const initialState: PostComponentsSelectorModalState = false

const postComponentsSelectorModalSlice = createSlice({
  name: 'postComponentsSelectorModal',
  initialState,
  reducers: {
    showPostComponentsSelectorModal: () => true,
    hidePostComponentsSelectorModal: () => false,
  },
})

export const {
  showPostComponentsSelectorModal,
  hidePostComponentsSelectorModal,
} = postComponentsSelectorModalSlice.actions

export default postComponentsSelectorModalSlice.reducer