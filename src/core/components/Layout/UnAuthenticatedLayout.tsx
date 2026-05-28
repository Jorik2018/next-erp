'use client'

import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import UnAuthenticatedNav from '../NavigationBar/UnAuthenticatedNav'
import LoadingScreenModal from '../LoadingScreenModal'
import { ErrorAlert } from '../Alert'
import { RootState } from '@/core/store'

type UnAuthenticatedLayoutProps = {
	children: ReactNode
}

export default function UnAuthenticatedLayout({
	children,
}: UnAuthenticatedLayoutProps) {
	const isMutating = useSelector((state: RootState) => state.mutationStatus)
	const errorAlert = useSelector((state: RootState) => state.errorAlertSlice)
	return (
		<div>
			{/*<LoadingScreenModal isLoading={isMutating} />*/}
			<UnAuthenticatedNav />
			<ErrorAlert $show={errorAlert.show}>
				{errorAlert.message}
			</ErrorAlert>
			{children}
		</div>
	)
}