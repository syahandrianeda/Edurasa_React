import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KategoriKeuanganSheetType } from "~/types/tabungan/kategori-keuangan-type"

export type KategoriKeuanganSliceType = {
    data:KategoriKeuanganSheetType[],
    name:'kategori_akses',
    loaded:boolean
}

export const initialState:KategoriKeuanganSliceType = {
    data:[],
    name:'kategori_akses',
    loaded:false
}   
const KategoriKeuanganSlice = createSlice({
    name:'kategori_akses_keuangan',
    initialState,
    reducers:{
        setKategoriAkses_keuangan(state, actions:PayloadAction<KategoriKeuanganSliceType>){
            state.data = actions.payload.data,
            state.name = 'kategori_akses',
            state.loaded = true;
        }
    }
    }
)

export const {setKategoriAkses_keuangan} = KategoriKeuanganSlice.actions;

export default KategoriKeuanganSlice.reducer