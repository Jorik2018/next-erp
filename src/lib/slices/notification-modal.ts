// src/store/slices/notificationModalSlice.ts

import { createSlice } from '@reduxjs/toolkit'

type NotificationModalState = boolean

const initialState: NotificationModalState = false

const notificationModalSlice = createSlice({
  name: 'notificationModal',
  initialState,
  reducers: {
    showNotificationModal: () => true,
    hideNotificationModal: () => false,
  },
})

export const {
  showNotificationModal,
  hideNotificationModal,
} = notificationModalSlice.actions

export default notificationModalSlice.reducer