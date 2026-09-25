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
        }, 
        upsertSettingJadwalMapel(
                                state,
                                action: PayloadAction<settingJadwalSheet[]>
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
                                state.name = 'setting_jadwal'
                                state.data = Array.from(dataMap.values());
                                state.loaded=action.payload.length>0
                                },
    }
});
export const {setSettingJadwalMapel, upsertSettingJadwalMapel} = settingJadwalMapelSlice.actions;
export default settingJadwalMapelSlice.reducer;