import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SiswaDapodikAppToSheet } from "~/types/siswa-dapodik"

type DapodikSheetSliceType={
    data:SiswaDapodikAppToSheet[]
    name:'dapodik',
    loaded:boolean
}

const initialState:DapodikSheetSliceType = {
    data: [],
    name:'dapodik',
    loaded:false
}

const siswaDapodik = createSlice({
    name:'siswaDapodik',
    initialState,
    reducers:{
            setSiswaDapodik(state, action: PayloadAction<SiswaDapodikAppToSheet[]>) {
                state.data = action.payload
                state.loaded = true;
            },
            upsertSiswaDapodik(
                                state,
                                action: PayloadAction<SiswaDapodikAppToSheet[]>
                            ) {
                                const newData = action.payload
                    
                                const dataMap = new Map(
                                    state.data.map(item => [item.index, item])
                                );
                    
                                for (const item of newData) {
                                    dataMap.set(item.index, {
                                        ...dataMap.get(item.index),
                                        ...item,
                                    });
                                }
                                state.name ='dapodik'
                                state.data = Array.from(dataMap.values());
                                state.loaded=action.payload.length>0
                                },
            
        }
    }
);


export const { setSiswaDapodik, upsertSiswaDapodik} = siswaDapodik.actions
export default siswaDapodik.reducer