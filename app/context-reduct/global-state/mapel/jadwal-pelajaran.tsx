import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { jadwalMapelAccordTable, jadwalMapelSheet } from "~/types/setting_jadwal/jadwal_mapel"

export interface JadwalPelajaranSliceType extends SliceType<jadwalMapelAccordTable>  {
    // dataJadwalPelajaran:jadwalMapelAccordTable[],
    // loadedDataJadwalPelajaran:boolean
    name:'jadwal_mapel',
    data:jadwalMapelAccordTable[];
    loaded:boolean;
}
export const InitialState:JadwalPelajaranSliceType = {
    // dataJadwalPelajaran:[],
    name:'jadwal_mapel',
    data:[],
    // loadedDataJadwalPelajaran:false
    loaded:false
}

export const JadwalPelajaranSlice = createSlice({
    name:'jadwalPelajaran',
    initialState:InitialState,
    reducers:{
        setDataJadwalPelajaran(state, action:PayloadAction<jadwalMapelAccordTable[]>){
            // state.dataJadwalPelajaran = action.payload
            state.data = action.payload
            // state.loadedDataJadwalPelajaran = true
            state.loaded = true
        },
        setJadwalMapel(state, action:PayloadAction<jadwalMapelAccordTable[]>){
            // state.dataJadwalPelajaran = action.payload
            state.data = action.payload
            // state.loadedDataJadwalPelajaran = true
            state.loaded = true
        },
    }
});

export const {setDataJadwalPelajaran,setJadwalMapel} = JadwalPelajaranSlice.actions;
export default JadwalPelajaranSlice.reducer;