import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./slices";
import { loadState, saveState } from "@/helpers/storage";

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  const preloadedState: RootState | undefined = typeof window !== "undefined"
    //Expected 0 type arguments, but got 1.
    ? loadState<RootState>()
    : undefined;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  if (typeof window !== "undefined") {
    store.subscribe(() => {
      saveState(store.getState());
    });
  }

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];
