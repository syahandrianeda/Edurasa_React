import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserPtk } from "~/types";
import type { KeuanganSheetType } from "~/types/tabungan/keuangan-sheet-type";

export type dataKeuanganSlice ={
    user_id?: UserPtk['id'],
    data:KeuanganSheetType[],

}
export interface KeuanganSliceType{
    data:dataKeuanganSlice[]
    name:'keuangan'
    loaded:boolean
}

const initialState:KeuanganSliceType = {
    data:[],
    name:'keuangan',
    loaded:false
}

const KeuanganSlice = createSlice({
    name:'keuangan',
    initialState,
    reducers:{
        setKeuanganUser(state, action:PayloadAction<dataKeuanganSlice>){
            const index = state.data.findIndex(s=>s.user_id === action.payload.user_id);
            if(index === -1){
                state.data.push(action.payload);
            }else{
                state.data[index] = action.payload;
            }
        },
         upsertKeuanganUser(
                    state,
                    action: PayloadAction<dataKeuanganSlice>
                ) {
                    const index = state.data.findIndex(s=>s.user_id === action.payload.user_id);
            if(index === -1){
                state.data.push(action.payload);
            }else{
                state.data[index] = action.payload;
            }
            state.name = 'keuangan',
            state.loaded = action.payload.data.length > 0
        }
    }
})

export const {setKeuanganUser, upsertKeuanganUser} = KeuanganSlice.actions;
export default KeuanganSlice.reducer;