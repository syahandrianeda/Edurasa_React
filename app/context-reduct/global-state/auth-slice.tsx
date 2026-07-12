import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User, UserPtk } from '~/types'

type AuthState<T  extends User= UserPtk> = {
    user: null | T,
    name:'auth',
    loaded:boolean
    // token: string | null
}

const initialState: AuthState = {
    user: null,
    name:'auth',
    loaded:false
    // token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    
    reducers: {
        setCredentials(state, action: PayloadAction<AuthState>) {
        state.user = action.payload.user,
        state.loaded = true;
        // state.token = action.payload.token
        },
        logout(state) {
        state.user = null;
        state.loaded = false
        // state.token = null
        },
    },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
