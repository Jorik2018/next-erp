// src/store/slices/loadingModalSlice.ts

import { createSlice } from '@reduxjs/toolkit'

type LoadingModalState = boolean

const initialState: LoadingModalState = false

const loadingModalSlice = createSlice({
  name: 'loadingModal',

  initialState,

  reducers: {
    showLoadingModal: () => true,

    hideLoadingModal: () => false,
  },
})

export const {
  showLoadingModal,
  hideLoadingModal,
} = loadingModalSlice.actions

export default loadingModalSlice.reducer