import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type";



type SuratMasukSliceType={
    data:SuratMasukSheetType[],
    name:'surat_masuk',
    loaded:boolean;
}

const initialState:SuratMasukSliceType = {
    data: [],
    name:'surat_masuk',
    loaded:false
}

const SuratMasukReducer = createSlice({
    name:'surat_masuk',
    initialState,
    reducers:{
            setSuratMasuk(state, action: PayloadAction<SuratMasukSheetType[]>) {
                state.loaded = true
                state.data = action.payload;
                state.name = 'surat_masuk'
                
            }
        }
    }
);


export const { setSuratMasuk} = SuratMasukReducer.actions
export default SuratMasukReducer.reducer