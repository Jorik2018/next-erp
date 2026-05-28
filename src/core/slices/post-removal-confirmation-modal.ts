// src/store/slices/postRemovalConfirmationModalSlice.ts

import { createSlice } from '@reduxjs/toolkit'

type PostRemovalConfirmationModalState = boolean

const initialState: PostRemovalConfirmationModalState = false

const postRemovalConfirmationModalSlice = createSlice({
  name: 'postRemovalConfirmationModal',

  initialState,

  reducers: {
    showPostRemovalConfirmationModal: () => true,

    hidePostRemovalConfirmationModal: () => false,
  },
})

export const {
  showPostRemovalConfirmationModal,
  hidePostRemovalConfirmationModal,
} = postRemovalConfirmationModalSlice.actions

export default postRemovalConfirmationModalSlice.reducer