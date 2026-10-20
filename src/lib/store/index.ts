// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import searchPanel from '../slices/searchbar-panel'
import postRemovalConfirmationModal from '../slices/post-removal-confirmation-modal'
import notificationModal from '../slices/notification-modal'
import postPreviewModal from '../slices/post-preview-modal'
import postComponentsSelectorModal from '../slices/post-components-selector-modal'
import user from '../slices/user'
import editingPostReceipe from '../slices/editing-post-receipe'
import editPostComponentModal from '../slices/edit-post-component-modal'
import addPostComponentModal from '../slices/add-post-component-modal'
import chatroomModal from '../slices/chatroom-modal'
import classroomInvitationModal from '../slices/classroom-invitation-modal'
import mutationStatus from '../slices/mutation-status'
import errorAlert from '../slices/error-alert'

export const store = configureStore({
    reducer: {
        addPostComponentModal,
        chatroomModal,
        classroomInvitationModal,
        searchPanel,
        editPostComponentModal,
        postRemovalConfirmationModal,
        notificationModal,
        postPreviewModal,
        postComponentsSelectorModal,
        editingPostReceipe,
        mutationStatus,
        errorAlert,
        user
    },

    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch