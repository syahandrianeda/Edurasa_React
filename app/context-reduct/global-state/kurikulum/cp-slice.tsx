import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface dataCPSlice extends KurmerProperty<ElemenCpType>{
    name:'elemen_cp',
    loaded:boolean
};

const initialState:dataCPSlice = {
    name:'elemen_cp',
    data:[],
    loaded:false
}


const CP = createSlice({
    name:'CP',
    initialState:initialState,
    reducers:{
        setCp(state, action:PayloadAction<ElemenCpType[]>){
            state.data = action.payload
            state.loaded = true;
        },
        
    }
});

export const {setCp} = CP.actions;
export default CP.reducer;


