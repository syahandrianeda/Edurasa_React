import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";
// import type { SppdSheetType } from "~/types/surat/surat-keluar-sheet-type";


type SppdSliceType={
    data:SppdSheetType[],
    name:'sppd',
    loaded:boolean;
}

const initialState:SppdSliceType = {
    data: [],
    name:'sppd',
    loaded:false
}

const SppdReducer = createSlice({
    name:'sppd',
    initialState,
    reducers:{
            setSppd(state, action: PayloadAction<SppdSheetType[]>) {
                state.loaded = true
                state.data = action.payload;
                state.name = 'sppd'
                
            }
        }
    }
);


export const { setSppd} = SppdReducer.actions
export default SppdReducer.reducer