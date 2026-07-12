import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export interface FaseBSliceType extends KurmerProperty<FaseKurikulumType>{
    loaded:boolean
}
const initialState:FaseBSliceType = {
    name:"faseB",
    data:[],
    loaded:false
};
const FaseB = createSlice({
    name: "faseB",
    initialState,
    reducers:{
        setFaseB(state, action:PayloadAction<FaseKurikulumType[]>){
            state.name="faseB";
            state.data = action.payload;
            state.loaded = true;
        }
    }
})
export const {setFaseB} = FaseB.actions;
export default FaseB.reducer;