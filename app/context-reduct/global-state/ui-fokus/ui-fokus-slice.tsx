import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialUiFokusCollection, type BuktiSerahTerima, type UiFokusCollection } from "./ui-fokus-collection";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";

type UiFokusSliceType = {
    data: UiFokusCollection,
    name: 'UiFokus',
}

const initialState:UiFokusSliceType ={
    data: initialUiFokusCollection,
    name: 'UiFokus'
}

const UiFokusSlice = createSlice({
    name:'uiFokus',
    initialState,
    reducers:{
        setFokusSerahTerimaDokumen(state, action:PayloadAction<number>){
            state.data.serahTerimaDokumen = action.payload
        },
        setFokusBuktiSerahTerima(state, action:PayloadAction<BuktiSerahTerima>){
            state.data.buktiSerahTerima = action.payload
        },
        setFokusFillTgl(state, action:PayloadAction<boolean>){
            state.data.fillTgl = action.payload
        }
    }
});

export const {
    setFokusSerahTerimaDokumen, 
    setFokusBuktiSerahTerima, 
    setFokusFillTgl
    } = UiFokusSlice.actions;
export default UiFokusSlice.reducer;
