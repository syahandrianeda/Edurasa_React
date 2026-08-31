import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialUiFokusCollection, type BuktiSerahTerima, type UiFokusCollection } from "./ui-fokus-collection";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import type { EditorSoalType } from "~/types/bank-soal/editor-soal";

type UiFokusSliceType = {
    data: UiFokusCollection,
    name: 'UiFokus',
    loaded:boolean
}

const initialState:UiFokusSliceType ={
    data: initialUiFokusCollection,
    name: 'UiFokus',
    loaded:true

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
        }, 
        
        /** fokus ketika membuat item soal */

        setFokusBentukSoal(state, action:PayloadAction<ListBentukSoalType>){
            state.data.fokusBentukSoal = action.payload
        },
        setFokusAtp(state, action:PayloadAction<AtpAsOrm|undefined>){
            state.data.fokusAtp = action.payload
        },
        setFokusEditor(state, action:PayloadAction<EditorSoalType>){
            state.data.fokusEditor = action.payload
        }

    }
});

export const {
    setFokusSerahTerimaDokumen, 
    setFokusBuktiSerahTerima, 
    setFokusFillTgl,
    setFokusAtp,
    setFokusEditor,
    setFokusBentukSoal
    } = UiFokusSlice.actions;
export default UiFokusSlice.reducer;
