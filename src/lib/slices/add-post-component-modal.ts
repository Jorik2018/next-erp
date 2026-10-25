// store/slices/addPostComponentModalSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AddPostComponentModalState, PostComponentType } from '../helpers/post'
import { PARAGRAPH } from '../constants/post-content/components'

const initialState: AddPostComponentModalState = {
  isShowing: false,
  type: PARAGRAPH,
}

const addPostComponentModalSlice = createSlice({
  name: 'addPostComponentModal',

  initialState,

  reducers: {
    showAddPostComponentModal: (
      state,
      action: PayloadAction<PostComponentType>,
    ) => {
      state.isShowing = true
      state.type = action.payload
    },

    hideAddPostComponentModal: state => {
      state.isShowing = false
      state.type = PARAGRAPH
    },
  },
})

export const {
  showAddPostComponentModal,
  hideAddPostComponentModal,
} = addPostComponentModalSlice.actions

export default addPostComponentModalSlice.reducer