// src/lib/slices/editing-post-receipe.ts

import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  PostComponent,
} from "@/lib/helpers/post";

import type {
  EditPostComponentPayload,
} from "@/types/post-component-editor";

type PostComponentsState =
  PostComponent[];

const initialState: PostComponentsState = [];

const postComponentsSlice =
  createSlice({
    name: "postComponents",

    initialState,

    reducers: {
      initializePost: (
        _state,
        action: PayloadAction<PostComponentsState>
      ) =>
        action.payload,

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
        const {
          order,
          type,
          newData,
        } = action.payload;

        const index =
          state.findIndex(
            (item) =>
              item.order === order &&
              item.type === type
          );

        if (index === -1) {
          return;
        }

        state[index] = {
          ...state[index],
          data: newData,
        } as PostComponent;
      },

      removePostComponent: (
        state,
        action: PayloadAction<number>
      ) =>
        state
          .filter(
            (component) =>
              component.order !==
              action.payload
          )
          .map(
            (component, index) => ({
              ...component,
              order: index,
            })
          ),

      resetPost: () =>
        initialState,
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