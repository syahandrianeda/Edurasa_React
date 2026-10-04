import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type"
import type { RekapKategoriSementaraType } from "./RekapKategoriSementaraType"
import type { UsRekapSheetType } from "~/types/penilaian/rekap_sementara_sheet_type"

type UsSliceType={
    data: RekapKategoriSementaraType<UsRekapSheetType>[],
    loaded:boolean,
    name: 'us'
}

const initialState:UsSliceType = {
    data:[],
    loaded:false,
    name: 'us'
}

const UsSlice = createSlice(
    {
        name:'us',
        initialState, 
        reducers: {
            setUs(state, action:PayloadAction<RekapKategoriSementaraType<UsRekapSheetType>>){
                 const index = state.data.findIndex(s=>s.jenjang === action.payload.jenjang);
                if(index === -1){
                    state.data.push(action.payload);
                }else{
                    // state.data[index] = action.payload;
                    const dataTab = state.data[index]
                    dataTab.data = [...dataTab.data, ...action.payload.data]
                    state.data[index] = dataTab;
                }
            },
            upsertUs(state, action:PayloadAction<RekapKategoriSementaraType<UsRekapSheetType>>){
                 const index = state.data.findIndex(s=>s.jenjang === action.payload.jenjang);
                if(index === -1){
                    state.data.push(action.payload);
                }else{
                    // state.data[index] = action.payload;
                    const dataTab = state.data[index]
                    dataTab.data = [...dataTab.data, ...action.payload.data]
                    state.data[index] = dataTab;
                }
            },
        }
    }
)

export const {setUs, upsertUs} = UsSlice.actions;
export default UsSlice.reducer;