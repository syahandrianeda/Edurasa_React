import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RiwayatRombelSheetType } from "~/types/buku-induk/riwayat-rombel";



type RiwayatRombelSliceType={
    data:RiwayatRombelSheetType[],
    name:'riwayat_rombel',
    loaded:boolean;
}

const initialState:RiwayatRombelSliceType = {
    data: [],
    name:'riwayat_rombel',
    loaded:false
}

const RiwayatRombelReducer = createSlice({
    name:'riwayat_rombel',
    initialState,
    reducers:{
            setRiwayatRombel(state, action: PayloadAction<RiwayatRombelSheetType[]>) {
                state.loaded = true
                state.data = action.payload;
                state.name = 'riwayat_rombel'
                
            }
        }
    }
);


export const { setRiwayatRombel} = RiwayatRombelReducer.actions
export default RiwayatRombelReducer.reducer