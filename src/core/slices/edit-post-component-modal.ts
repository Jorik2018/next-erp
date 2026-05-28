// src/store/slices/editPostComponentModalSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type EditPostComponentModalState = {
  isShowing: boolean
  type?: string
  order?: number
}

const initialState: EditPostComponentModalState = {
  isShowing: false,
  type: undefined,
  order: undefined,
}

type ShowEditPostComponentModalPayload = {
  type: string
  order: number
}

const editPostComponentModalSlice = createSlice({
  name: 'editPostComponentModal',

  initialState,

  reducers: {
    showEditPostComponentModal: (
      state,
      action: PayloadAction<ShowEditPostComponentModalPayload>,
    ) => {
      state.isShowing = true
      state.type = action.payload.type
      state.order = action.payload.order
    },

    hideEditPostComponentModal: state => {
      state.isShowing = false
      state.type = undefined
      state.order = undefined
    },
  },
})

export const {
  showEditPostComponentModal,
  hideEditPostComponentModal,
} = editPostComponentModalSlice.actions

export default editPostComponentModalSlice.reducer