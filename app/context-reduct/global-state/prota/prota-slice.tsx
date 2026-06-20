import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { protaSheet } from "~/types/kurikulum/prota-orm"

export type ProtaSliceType={
    dataProta:protaSheet[],
    loadedDataProta:Boolean
}
export const InitialState:ProtaSliceType = {
    dataProta:[],
    loadedDataProta:false
}   

export const ProtaSlice = createSlice({
    name:'prota',
    initialState:InitialState,
    reducers:{
        setDataProta(state, action:PayloadAction<protaSheet[]>){
            state.dataProta = action.payload
            state.loadedDataProta = true
        }
    }
});

export const {setDataProta} = ProtaSlice.actions;
export default ProtaSlice.reducer;

