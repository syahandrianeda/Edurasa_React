import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type"

export type PublikasiPaketSliceType = {
    data: PublikasiPaketSheetType[],
    name:'publikasi_paket',
    loaded:boolean
}

const initialState:PublikasiPaketSliceType = {
    data: [],
    name: 'publikasi_paket',
    loaded:false
}

const PublikasiPaketSlice = createSlice(
    {
        name:'publikasi_paket',
        initialState,
        reducers: {
            setPublikasiPaket(state, action: PayloadAction<PublikasiPaketSheetType[]>){
                state.data = action.payload,
                state.name = 'publikasi_paket',
                state.loaded = true
            },
            upsertPublikasiPaket(
                state,
                action: PayloadAction<PublikasiPaketSheetType[]>
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
                state.name = 'publikasi_paket';
            },
            
        }
    }
)

export const {setPublikasiPaket, upsertPublikasiPaket} = PublikasiPaketSlice.actions
export default PublikasiPaketSlice.reducer;