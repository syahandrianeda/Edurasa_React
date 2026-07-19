import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal"

export interface settingJadwalMapelSliceType extends SliceType<settingJadwalSheet> {
    
    name:'setting_jadwal',
    data:settingJadwalSheet[],
    loaded:boolean
}   

export const InitialState:settingJadwalMapelSliceType = {
    
    name:'setting_jadwal',
    data:[],
    loaded:false
}

export const settingJadwalMapelSlice = createSlice({
    name:'settingJadwalMapel',
    initialState:InitialState,
    reducers:{
        setSettingJadwalMapel(state, action:PayloadAction<settingJadwalSheet[]>){
            
            state.data = action.payload;
            state.name='setting_jadwal';
            state.loaded = true
        }
    }
});
export const {setSettingJadwalMapel} = settingJadwalMapelSlice.actions;
export default settingJadwalMapelSlice.reducer;