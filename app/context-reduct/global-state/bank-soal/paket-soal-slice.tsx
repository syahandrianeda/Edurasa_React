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
        },
        upsertPaketSoal(
            state,
            action: PayloadAction<PaketSoalSheetType[]>
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
            state.name = "paket_soal";
        },


    }
});

export const {setPaketSoal, upsertPaketSoal} = PaketSoalSlice.actions;
export default PaketSoalSlice.reducer;