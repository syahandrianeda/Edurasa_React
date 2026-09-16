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
            }
        }
    }
)

export const {setPublikasiPaket} = PublikasiPaketSlice.actions
export default PublikasiPaketSlice.reducer;