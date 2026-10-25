// src/lib/slices/searchbar-panel.ts

import { createSlice } from '@reduxjs/toolkit'

type SearchPanelState = boolean

const initialState: SearchPanelState = false

const searchPanelSlice = createSlice({
  name: 'searchPanel',

  initialState,

  reducers: {
    showSearchPanel: () => true,

    hideSearchPanel: () => false,
  },
})

export const {
  showSearchPanel,
  hideSearchPanel,
} = searchPanelSlice.actions

export default searchPanelSlice.reducer