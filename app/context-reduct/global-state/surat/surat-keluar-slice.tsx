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
                
            },
            upsertSuratKeluar(
                                   state,
                                   action: PayloadAction<SuratKeluarSheetType[]>
                               ) {
                                   const newData = action.payload;
                       
                                   const dataMap = new Map(
                                       state.data.map(item => [item.idbaris, item])
                                   );
                       
                                   for (const item of newData) {
                                       dataMap.set(item.idbaris, {
                                           ...dataMap.get(item.idbaris),
                                           ...item,
                                       });
                                   }
                                   state.name = 'surat_keluar'
                                   state.data = Array.from(dataMap.values());
                                   state.loaded=action.payload.length>0
                                   },
            
        }
    }
);


export const { setSuratKeluar, upsertSuratKeluar} = SuratKeluarReducer.actions
export default SuratKeluarReducer.reducer