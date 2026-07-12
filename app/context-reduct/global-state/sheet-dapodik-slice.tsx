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
            }
        }
    }
);


export const { setSiswaDapodik} = siswaDapodik.actions
export default siswaDapodik.reducer