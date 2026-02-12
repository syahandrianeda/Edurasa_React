import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SiswaDapodikAppToSheet } from "~/types/siswa-dapodik"

type DapodikSheetSliceType={
    siswaDapodik:SiswaDapodikAppToSheet[]|[]
}

const initialState:DapodikSheetSliceType = {
    siswaDapodik: []
}

const siswaDapodik = createSlice({
    name:'siswaDapodik',
    initialState,
    reducers:{
            setSiswaDapodik(state, action: PayloadAction<DapodikSheetSliceType>) {
                state.siswaDapodik = action.payload.siswaDapodik;
            }
        }
    }
);


export const { setSiswaDapodik} = siswaDapodik.actions
export default siswaDapodik.reducer