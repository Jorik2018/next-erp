// src/store/slices/errorAlertSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ErrorAlertState = {
	show: boolean
	message: string
}

const initialState: ErrorAlertState = {
	show: false,
	message: '',
}

const errorAlertSlice = createSlice({
	name: 'errorAlert',

	initialState,

	reducers: {
		showErrorAlert: (state, action: PayloadAction<string>) => {
			state.show = true
			state.message = action.payload
		},

		hideErrorAlert: state => {
			state.show = false
			state.message = ''
		},
	},
})

export const { showErrorAlert, hideErrorAlert } = errorAlertSlice.actions

export default errorAlertSlice.reducer