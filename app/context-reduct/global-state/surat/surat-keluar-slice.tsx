import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";


type SuratKeluarSliceType={
    data:SuratKeluarSheetType[],
    name:'surat_keluar',
    loaded:boolean;
}

const initialState:SuratKeluarSliceType = {
    data: [],
    name:'surat_keluar',
    loaded:false
}

const SuratKeluarReducer = createSlice({
    name:'surat_keluar',
    initialState,
    reducers:{
            setSuratKeluar(state, action: PayloadAction<SuratKeluarSheetType[]>) {
                state.loaded = true
                state.data = action.payload;
                state.name = 'surat_keluar'
                
            }
        }
    }
);


export const { setSuratKeluar} = SuratKeluarReducer.actions
export default SuratKeluarReducer.reducer