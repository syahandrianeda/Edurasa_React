import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { protaSheet } from "~/types/kurikulum/prota-orm"

export type ProtaSliceType={
    data:protaSheet[],
    name:'prota',
    loaded:Boolean
}
export const InitialState:ProtaSliceType = {
    data:[],
    name:'prota',
    loaded:false
}   

export const ProtaSlice = createSlice({
    name:'prota',
    initialState:InitialState,
    reducers:{
        setDataProta(state, action:PayloadAction<protaSheet[]>){
            state.data = action.payload
            state.loaded = true
        }
    }
});

export const {setDataProta} = ProtaSlice.actions;
export default ProtaSlice.reducer;

