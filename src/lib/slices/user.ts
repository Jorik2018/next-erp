// src/store/slices/userSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { AuthenticatedUser } from '../types/user'


const initialState: AuthenticatedUser = {
  id: '',
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