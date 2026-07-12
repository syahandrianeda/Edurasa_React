import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export interface FaseCSliceType extends KurmerProperty<FaseKurikulumType>{
    loaded:boolean
}
const initialState:FaseCSliceType = {
    name:"faseC",
    data:[],
    loaded:false
};
const FaseC = createSlice({
    name: "faseC",
    initialState,
    reducers:{
        setFaseC(state, action:PayloadAction<FaseKurikulumType[]>){
            state.name="faseC";
            state.data = action.payload;
            state.loaded = true;
        }
    }
})
export const {setFaseC} = FaseC.actions;
export default FaseC.reducer;