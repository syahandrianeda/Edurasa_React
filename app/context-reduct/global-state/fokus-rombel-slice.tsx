import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type fokusRombelType = {
    value? : string,
}

const initialState: fokusRombelType = {
    value: undefined
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
