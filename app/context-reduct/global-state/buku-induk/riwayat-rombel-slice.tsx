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
                
            },
            upsertRiwayatRombel(
                    state,
                    action: PayloadAction<RiwayatRombelSheetType[]>
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
                    state.name = 'riwayat_rombel';
                },
        }
    }
);


export const { setRiwayatRombel,upsertRiwayatRombel} = RiwayatRombelReducer.actions
export default RiwayatRombelReducer.reducer