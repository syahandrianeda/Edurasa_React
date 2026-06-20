import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal"

export type settingJadwalMapelSliceType = {
    settingJadwal:settingJadwalSheet[],
    loadedSettingJadwal:boolean
}   

export const InitialState:settingJadwalMapelSliceType = {
    settingJadwal:[],
    loadedSettingJadwal:false
}

export const settingJadwalMapelSlice = createSlice({
    name:'settingJadwalMapel',
    initialState:InitialState,
    reducers:{
        setSettingJadwalMapel(state, action:PayloadAction<settingJadwalSheet[]>){
            state.settingJadwal = action.payload
            state.loadedSettingJadwal = true
        }
    }
});
export const {setSettingJadwalMapel} = settingJadwalMapelSlice.actions;
export default settingJadwalMapelSlice.reducer;