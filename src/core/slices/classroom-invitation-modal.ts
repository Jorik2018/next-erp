// src/store/slices/classroomInvitationModalSlice.ts

import { createSlice } from '@reduxjs/toolkit'

type ClassroomInvitationModalState = boolean

const initialState: ClassroomInvitationModalState = false

const classroomInvitationModalSlice = createSlice({
  name: 'classroomInvitationModal',
  initialState,
  reducers: {
    showClassroomInvitationModal: () => true,
    hideClassroomInvitationModal: () => false,
  },
})

export const {
  showClassroomInvitationModal,
  hideClassroomInvitationModal,
} = classroomInvitationModalSlice.actions

export default classroomInvitationModalSlice.reducer