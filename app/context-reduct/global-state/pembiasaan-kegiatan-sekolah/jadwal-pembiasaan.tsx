import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { pembiasaanSheet } from "~/types/pembiasaan/pembiasaan"

export type JadwalPembiasaanSliceType ={
    name:'kegiatan_nonkbm',
    data:pembiasaanSheet[],
    loaded:boolean
}
export const InitialState:JadwalPembiasaanSliceType = {
    name:'kegiatan_nonkbm',
    data:[],
    loaded:false
}

export const JadwalPembiasaanSlice = createSlice({
    name:'jadwalPembiasaan',
    initialState:InitialState,
    reducers:{
        setDataJadwalPembiasaan(state, action:PayloadAction<pembiasaanSheet[]>){
            state.data = action.payload;
            state.loaded = true
        }
    }
});

export const {setDataJadwalPembiasaan} = JadwalPembiasaanSlice.actions;
export default JadwalPembiasaanSlice.reducer;
