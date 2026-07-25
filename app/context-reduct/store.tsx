import { configureStore, type Store } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export function createStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    // devTools: import.meta.env.DEV,
  });
}



export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppStoreRedux = Store<RootState>;

