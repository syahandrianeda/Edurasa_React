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
                
            },
            upsertSuratMasuk(
                                state,
                                action: PayloadAction<SuratMasukSheetType[]>
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
                                state.name ='surat_masuk'
                                state.data = Array.from(dataMap.values());
                                state.loaded=action.payload.length>0
                                },
        }
    }
);


export const { setSuratMasuk, upsertSuratMasuk} = SuratMasukReducer.actions
export default SuratMasukReducer.reducer