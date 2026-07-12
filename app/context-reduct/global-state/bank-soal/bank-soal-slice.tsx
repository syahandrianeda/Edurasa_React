import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type"

type BankSoalSliceType = {
    name:'bank_soal',
    data:BankSoalSheetType[],
    loaded:boolean
}

const initialState:BankSoalSliceType={
    name:'bank_soal',
    data:[],
    loaded:false
};

const BankSoalSlice = createSlice({
    name:'BankSoal',
    initialState,
    reducers:{
        setBankSoal(state, action:PayloadAction<BankSoalSheetType[]>){
            state.data = action.payload;
            state.loaded = true;
        }
    }
})
export const {setBankSoal} = BankSoalSlice.actions;
export default BankSoalSlice.reducer;
