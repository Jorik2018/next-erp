// src/lib/slices/editing-post-receipe.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PostComponentType } from "@/helpers/post";

export interface PostComponent {
  order?: number;
  type: PostComponentType;
  data: unknown;
}

export interface EditPostComponentPayload {
  order?: number;
  type: PostComponentType;
  newData: unknown;
}

type PostComponentsState = PostComponent[];

const initialState: PostComponentsState = [];

const postComponentsSlice = createSlice({
  name: "postComponents",

  initialState,

  reducers: {
    initializePost: (state) => state,

    addNewPostComponent: (
      state,
      action: PayloadAction<PostComponent>
    ) => {
      state.push(action.payload);
    },

    editPostComponent: (
      state,
      action: PayloadAction<EditPostComponentPayload>
    ) => {
      const { order, type, newData } = action.payload;

      const component = state.find(
        (item) =>
          item.order === order &&
          item.type === type
      );

      if (component) {
        component.data = newData;
      }
    },

    removePostComponent: (
      state,
      action: PayloadAction<number>
    ) =>
      state
        .filter(
          (component) =>
            component.order !== action.payload
        )
        .map((component, index) => ({
          ...component,
          order: index,
        })),

    resetPost: () => initialState,
  },
});

export const {
  initializePost,
  addNewPostComponent,
  editPostComponent,
  removePostComponent,
  resetPost,
} = postComponentsSlice.actions;

export default postComponentsSlice.reducer;