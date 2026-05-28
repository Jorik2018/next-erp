// src/store/slices/postComponentsSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type PostComponent = {
  order?: number
  type: string
  data: unknown
}

type PostComponentsState = PostComponent[]

type EditPostComponentPayload = {
  order?: number
  type: string
  newData: unknown
}

const initialState: PostComponentsState = []

const postComponentsSlice = createSlice({
  name: 'postComponents',

  initialState,

  reducers: {
    initializePost: state => state,

    addNewPostComponent: (
      state,
      action: PayloadAction<PostComponent>,
    ) => {
      state.push(action.payload)
    },

    editPostComponent: (
      state,
      action: PayloadAction<EditPostComponentPayload>,
    ) => {
      const { order, type, newData } = action.payload

      const component = state.find(
        item => item.order === order && item.type === type,
      )

      if (component) {
        component.data = newData
      }
    },

    removePostComponent: (
      state,
      action: PayloadAction<number>,
    ) => {
      return state
        .filter(component => component.order !== action.payload)
        .map((component, index) => ({
          ...component,
          order: index,
        }))
    },

    resetPost: () => initialState,
  },
})

export const {
  initializePost,
  addNewPostComponent,
  editPostComponent,
  removePostComponent,
  resetPost,
} = postComponentsSlice.actions

export default postComponentsSlice.reducer