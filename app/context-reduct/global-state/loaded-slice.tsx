import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type loadedApiType={
    loaded:boolean
}

const initialState:loadedApiType = {
    loaded:false
}


const loadedApiSlice = createSlice({
    name: 'loadedApi',
    initialState,
    
    reducers: {
        setloadedApi(state, action: PayloadAction<loadedApiType>) {
        state.loaded = action.payload.loaded
        // state.token = action.payload.token
        },
        
    },
})

export const { setloadedApi} = loadedApiSlice.actions
export default loadedApiSlice.reducer
