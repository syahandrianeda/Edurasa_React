import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { jadwalMapelAccordTable, jadwalMapelSheet } from "~/types/setting_jadwal/jadwal_mapel"

export type JadwalPelajaranSliceType = {
    dataJadwalPelajaran:jadwalMapelAccordTable[],
    loadedDataJadwalPelajaran:Boolean
}
export const InitialState:JadwalPelajaranSliceType = {
    dataJadwalPelajaran:[],
    loadedDataJadwalPelajaran:false
}

export const JadwalPelajaranSlice = createSlice({
    name:'jadwalPelajaran',
    initialState:InitialState,
    reducers:{
        setDataJadwalPelajaran(state, action:PayloadAction<jadwalMapelAccordTable[]>){
            state.dataJadwalPelajaran = action.payload
            state.loadedDataJadwalPelajaran = true
        }
    }
});

export const {setDataJadwalPelajaran} = JadwalPelajaranSlice.actions;
export default JadwalPelajaranSlice.reducer;