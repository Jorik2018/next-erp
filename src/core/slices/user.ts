// src/store/slices/userSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AuthenticatedUser = {
  _id: string
  fname: string
  lname: string
  email: string
}

const initialState: AuthenticatedUser = {
  _id: '',
  fname: '',
  lname: '',
  email: '',
}

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    initializeAuthenticatedUser: (
      _state,
      action: PayloadAction<AuthenticatedUser>,
    ) => action.payload,

    deinitializeUser: () => initialState,
  },
})

export const {
  initializeAuthenticatedUser,
  deinitializeUser,
} = userSlice.actions

export default userSlice.reducer