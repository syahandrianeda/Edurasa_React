import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";


export interface PangkatGolonganSliceType{
    name:'pangkat_golongan',
    data:PangkatGolonganSheetType[],
    loaded:boolean
}

const initialState:PangkatGolonganSliceType={
    name:'pangkat_golongan',
    data:[],
    loaded:false
}
const PangkatGolonganSlice = createSlice({    
    name:'PangkatGolonganSlice',
    initialState, 
    reducers:{
        setPangkatGolongan(state, action:PayloadAction<PangkatGolonganSheetType[]>){
            state.data = action.payload;
            state.name = 'pangkat_golongan';
            state.loaded = true;
        }
    }
})

export const {setPangkatGolongan} = PangkatGolonganSlice.actions;
export default PangkatGolonganSlice.reducer;