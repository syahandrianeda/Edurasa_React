import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type fokusRombelType = {
    value : string|null,
}

const initialState: fokusRombelType = {
    value: null
}


const fokusRombelSlice = createSlice({
    name: 'fokusRombel',
    initialState,
    
    reducers: {
        setFokusRombel(state, action: PayloadAction<fokusRombelType>) {
        state.value = action.payload.value
        // state.token = action.payload.token
        },
        
    },
})

export const { setFokusRombel} = fokusRombelSlice.actions
export default fokusRombelSlice.reducer
