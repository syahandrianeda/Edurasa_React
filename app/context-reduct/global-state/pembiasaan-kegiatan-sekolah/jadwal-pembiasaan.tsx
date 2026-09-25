import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { pembiasaanSheet } from "~/types/pembiasaan/pembiasaan"
import type { upsertDataJadwalPelajaran } from "../mapel/jadwal-pelajaran";

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
        },
         upsertDataJadwalPembiasaan(
                                state,
                                action: PayloadAction<pembiasaanSheet[]>
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
                                state.name = 'kegiatan_nonkbm'
                                state.data = Array.from(dataMap.values());
                                state.loaded=action.payload.length>0
                                },
    }
});

export const {setDataJadwalPembiasaan, upsertDataJadwalPembiasaan} = JadwalPembiasaanSlice.actions;
export default JadwalPembiasaanSlice.reducer;
