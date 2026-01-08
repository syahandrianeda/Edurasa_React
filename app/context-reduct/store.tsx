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









// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './rootReducer'
// import { getSessionApp } from '~/infrastructures/session-storage/app-session'
// import type { UserPtk } from '~/types'
// import { getSessionRombel } from '~/infrastructures/session-storage/rombel-session';

// function loadAuthState(){
//     try {
//     const raw = getSessionApp<UserPtk>();
    
//     return raw ?{
//         user: raw
//     }:{
//         user:null
//     }
//   } catch {
//     return undefined
//   }
// }


// function loadFokusRombelState(){
//     try {
//     const fokusRombel = getSessionRombel();
    
//     return fokusRombel ?{
//         user: fokusRombel
//     }:{
//         user:null
//     }
//   } catch {
//     return undefined
//   }
// }


// const preLoad = loadAuthState();
// const stateFokusRombel = loadFokusRombelState();

// export const store = configureStore({
//     reducer: rootReducer,
//     preloadedState,
// //   devTools: import.meta.env.DEV,
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
