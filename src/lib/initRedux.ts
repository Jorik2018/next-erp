import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './slices'
import { saveState } from '@/lib/helpers/storage'

export type RootState =
  ReturnType<typeof rootReducer>

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer
  })

  if (typeof window !== 'undefined') {
    store.subscribe(() => {
      saveState(store.getState())
    })
  }

  return store
}

export type AppStore =
  ReturnType<typeof makeStore>

export type AppDispatch =
  AppStore['dispatch']