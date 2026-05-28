// store/slices/addPostComponentModalSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AddPostComponentModalState = {
  isShowing: boolean
  type?: string
}

const initialState: AddPostComponentModalState = {
  isShowing: false,
  type: undefined,
}

const addPostComponentModalSlice = createSlice({
  name: 'addPostComponentModal',

  initialState,

  reducers: {
    showAddPostComponentModal: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isShowing = true
      state.type = action.payload
    },

    hideAddPostComponentModal: state => {
      state.isShowing = false
      state.type = undefined
    },
  },
})

export const {
  showAddPostComponentModal,
  hideAddPostComponentModal,
} = addPostComponentModalSlice.actions

export default addPostComponentModalSlice.reducer