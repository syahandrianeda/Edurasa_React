import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export interface FaseASliceType extends KurmerProperty<FaseKurikulumType>{
    loaded:boolean
}
const initialState:FaseASliceType = {
    name:"faseA",
    data:[],
    loaded:false
};
const FaseA = createSlice({
    name: "faseA",
    initialState,
    reducers:{
        setFaseA(state, action:PayloadAction<FaseKurikulumType[]>){
            state.name="faseA";
            state.data = action.payload;
            state.loaded = true;
        }
    }
})
export const {setFaseA} = FaseA.actions;
export default FaseA.reducer;