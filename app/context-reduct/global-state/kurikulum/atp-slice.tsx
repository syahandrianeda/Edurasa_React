import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export interface AtpSliceType extends KurmerProperty<AtpKurikulumType>{
    loaded:boolean
}
const initialState:AtpSliceType = {
    name:"Atp",
    data:[],
    loaded:false
};
const Atp = createSlice({
    name: "Atp",
    initialState,
    reducers:{
        setAtp(state, action:PayloadAction<AtpKurikulumType[]>){
            state.name="Atp";
            state.data = action.payload;
            state.loaded = true;
        }
    }
})
export const {setAtp} = Atp.actions;
export default Atp.reducer;