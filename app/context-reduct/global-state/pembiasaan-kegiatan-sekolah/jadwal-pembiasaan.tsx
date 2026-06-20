import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { pembiasaanSheet } from "~/types/pembiasaan/pembiasaan"

export type JadwalPembiasaanSliceType = {
    dataJadwalPembiasaan:pembiasaanSheet[],
    loadedDataJadwalPembiasaan:boolean
}
export const InitialState:JadwalPembiasaanSliceType = {
    dataJadwalPembiasaan:[],
    loadedDataJadwalPembiasaan:false
}

export const JadwalPembiasaanSlice = createSlice({
    name:'jadwalPembiasaan',
    initialState:InitialState,
    reducers:{
        setDataJadwalPembiasaan(state, action:PayloadAction<pembiasaanSheet[]>){
            state.dataJadwalPembiasaan = action.payload
            state.loadedDataJadwalPembiasaan = true
        }
    }
});

export const {setDataJadwalPembiasaan} = JadwalPembiasaanSlice.actions;
export default JadwalPembiasaanSlice.reducer;
