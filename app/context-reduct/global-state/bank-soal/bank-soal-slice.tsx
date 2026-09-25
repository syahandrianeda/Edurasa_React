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
            state.name = 'bank_soal'
        },
        upsertBankSoal(
            state,
            action: PayloadAction<BankSoalSheetType[]>
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

            state.data = Array.from(dataMap.values());

            state.loaded = true;
            state.name = "bank_soal";
        },
        
    }
})
export const {setBankSoal, upsertBankSoal} = BankSoalSlice.actions;
export default BankSoalSlice.reducer;
