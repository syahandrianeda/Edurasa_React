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
        },
        upsertKategoriAkses_keuangan(
                               state,
                               action: PayloadAction<KategoriKeuanganSliceType>
                           ) {
                               const newData = action.payload.data;
                   
                               const dataMap = new Map(
                                   state.data.map(item => [item.idbaris, item])
                               );
                   
                               for (const item of newData) {
                                   dataMap.set(item.idbaris, {
                                       ...dataMap.get(item.idbaris),
                                       ...item,
                                   });
                               }
                               state.name = 'kategori_akses'
                               state.data = Array.from(dataMap.values());
                               state.loaded= newData.length>0
                               },
        
    }
    }
)

export const {setKategoriAkses_keuangan, upsertKategoriAkses_keuangan} = KategoriKeuanganSlice.actions;

export default KategoriKeuanganSlice.reducer