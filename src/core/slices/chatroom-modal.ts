// src/store/slices/chatroomModalSlice.ts

import { createSlice } from '@reduxjs/toolkit'

type ChatroomModalState = boolean

const initialState: ChatroomModalState = false

const chatroomModalSlice = createSlice({
  name: 'chatroomModal',

  initialState,

  reducers: {
    showChatroomModal: () => true,

    hideChatroomModal: () => false,
  },
})

export const {
  showChatroomModal,
  hideChatroomModal,
} = chatroomModalSlice.actions

export default chatroomModalSlice.reducer