import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";

export interface PaketSoalSliceType extends SliceType<PaketSoalSheetType> {
    data:PaketSoalSheetType[],
    name: 'paket_soal',
    loaded: boolean
}

const initialState:PaketSoalSliceType = {
    data: [],
    name: 'paket_soal',
    loaded:false,
}

const PaketSoalSlice = createSlice({
    name: 'paket_soal',
    initialState,
    reducers: {
        setPaketSoal(state, actions:PayloadAction<PaketSoalSheetType[]>){
            state.data = actions.payload;
            state.loaded = true,
            state.name = 'paket_soal'


        }
    }
});

export const {setPaketSoal} = PaketSoalSlice.actions;
export default PaketSoalSlice.reducer;