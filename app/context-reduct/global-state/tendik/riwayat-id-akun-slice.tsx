import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RiwayatAkunSheetType } from "~/types/tendik/riwayat-akun-sheet-type";

export interface RiwayatIdAkunSliceType{
    name:'riwayat_id_akun',
    data:RiwayatAkunSheetType[],
    loaded:boolean
}

const initialState:RiwayatIdAkunSliceType={
    name:'riwayat_id_akun',
    data:[],
    loaded:false
}
const RiwayatIdAkunSlice = createSlice({    
    name:'RiwayatIdAkunSlice',
    initialState, 
    reducers:{
        setRiwayatIdAkun(state, action:PayloadAction<RiwayatAkunSheetType[]>){
            state.data = action.payload;
            state.name = 'riwayat_id_akun';
            state.loaded = true;
        }
    }
})

export const {setRiwayatIdAkun} = RiwayatIdAkunSlice.actions;
export default RiwayatIdAkunSlice.reducer;