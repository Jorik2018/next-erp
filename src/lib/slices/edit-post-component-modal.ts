import {
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit'

import type {
  PostComponentType
} from '@/lib/helpers/post'
import { PARAGRAPH } from '../constants/post-content/components'

export interface EditPostComponentModalState {
  isShowing: boolean
  type: PostComponentType
  order: number
}

interface ShowEditPostComponentModalPayload {
  type: PostComponentType
  order: number
}

const initialState: EditPostComponentModalState = {
  isShowing: false,
  type: 'PARAGRAPH',
  order: 0
}

const editPostComponentModalSlice =
  createSlice({
    name: 'editPostComponentModal',

    initialState,

    reducers: {
      showEditPostComponentModal: (
        state,
        action: PayloadAction<
          ShowEditPostComponentModalPayload
        >
      ) => {
        state.isShowing = true
        state.type = action.payload.type
        state.order = action.payload.order
      },

      hideEditPostComponentModal: state => {
        state.isShowing = false
        state.type = PARAGRAPH
        state.order = 0
      }
    }
  })

export const {
  showEditPostComponentModal,
  hideEditPostComponentModal
} = editPostComponentModalSlice.actions

export default editPostComponentModalSlice.reducer