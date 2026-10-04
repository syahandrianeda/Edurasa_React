import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type"
import type { RekapKategoriSementaraType } from "./RekapKategoriSementaraType"
import type { AkhirSemesterRekapSheetType } from "~/types/penilaian/rekap_sementara_sheet_type"

type AkhirMidSemesterSliceType={
    data: RekapKategoriSementaraType<AkhirSemesterRekapSheetType>[],
    loaded:boolean,
    name: 'akhir_semester'
}

const initialState:AkhirMidSemesterSliceType = {
    data:[],
    loaded:false,
    name: 'akhir_semester'
}

const AkhirMidSemesterSlice = createSlice(
    {
        name:'akhir_semester',
        initialState, 
        reducers: {
            setAkhirMidSemester(state, action:PayloadAction<RekapKategoriSementaraType<AkhirSemesterRekapSheetType>>){
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
            upsertAkhirMidSemester(state, action:PayloadAction<RekapKategoriSementaraType<AkhirSemesterRekapSheetType>>){
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

export const {setAkhirMidSemester, upsertAkhirMidSemester} = AkhirMidSemesterSlice.actions;
export default AkhirMidSemesterSlice.reducer;