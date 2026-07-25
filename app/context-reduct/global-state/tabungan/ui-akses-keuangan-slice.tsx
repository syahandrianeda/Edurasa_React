import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type fokusKategoriKeuanganType = {
    kategori:string,
    rombel:string
}
export type UiFokusAksesRombelKeuanganType = {
    value?:fokusKategoriKeuanganType,
    name:'fokusRombelKategoriKeuangan',
    loaded:boolean
}


const initialState: UiFokusAksesRombelKeuanganType = {
    value: {
        kategori:'tabungan',
        rombel:'-'
    },
    
    name:'fokusRombelKategoriKeuangan',
    loaded:false
}

export const UiAksesRombelKeuangan = createSlice({
    name:'UiAksesRombelKeuangan',
    initialState,
    reducers:{
        setFokusAksesRombelKeuangan(state, action:PayloadAction<UiFokusAksesRombelKeuanganType>){
            state.value = action.payload.value
            state.loaded = true,
            state.name = 'fokusRombelKategoriKeuangan'
        }
    }
});
export const {setFokusAksesRombelKeuangan} = UiAksesRombelKeuangan.actions;
export default UiAksesRombelKeuangan.reducer