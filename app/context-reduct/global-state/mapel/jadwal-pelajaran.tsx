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
        upsertDataJadwalPelajaran(
                        state,
                        action: PayloadAction<jadwalMapelAccordTable[]>
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
                        state.name = 'jadwal_mapel'
                        state.data = Array.from(dataMap.values());
                        state.loaded=action.payload.length>0
                        },
        setJadwalMapel(state, action:PayloadAction<jadwalMapelAccordTable[]>){
            // state.dataJadwalPelajaran = action.payload
            state.data = action.payload
            // state.loadedDataJadwalPelajaran = true
            state.loaded = true
        },
        upsertJadwalMapel(
                        state,
                        action: PayloadAction<jadwalMapelAccordTable[]>
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
                        state.name = 'jadwal_mapel'
                        state.data = Array.from(dataMap.values());
                        state.loaded=action.payload.length>0
                        },
    }
});

export const {setDataJadwalPelajaran,setJadwalMapel, upsertDataJadwalPelajaran, upsertJadwalMapel} = JadwalPelajaranSlice.actions;
export default JadwalPelajaranSlice.reducer;