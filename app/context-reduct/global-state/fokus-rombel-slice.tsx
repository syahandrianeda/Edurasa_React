import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type fokusRombelType = {
    value? : string,
    name:'fokusRombel',
    loaded:boolean
}

const initialState: fokusRombelType = {
    value: undefined,
    
    name:'fokusRombel',
    loaded:false
}


const fokusRombelSlice = createSlice({
    name: 'fokusRombel',
    initialState,
    
    reducers: {
        setFokusRombel(state, action: PayloadAction<fokusRombelType>) {
        state.value = action.payload.value;
        state.loaded = true;
        // state.token = action.payload.token
        },
        
    },
})

export const { setFokusRombel} = fokusRombelSlice.actions
export default fokusRombelSlice.reducer
