import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { KoleksiMapel } from "~/domain/mapel/koleksi-mapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";

export type fokusMapel = {
    data:InterfaceMapel,
    disabled:boolean,
    name:'fokusMapel',
    loaded:boolean
}
const defaultFokusMapel = KoleksiMapel.find(s=>s.kode === 'PKN') as InterfaceMapel;

const initialState:fokusMapel = {
    data:defaultFokusMapel,
    disabled:false,
    name:'fokusMapel',
    loaded:false
}

const fokusMapel = createSlice({
    name:'fokusMapel',
    initialState,
    reducers:{
        setFokusMapel(state, action:PayloadAction<fokusMapel>){
            state.data = action.payload.data
            state.disabled = action.payload.disabled
        }
    }
});
export const {setFokusMapel} = fokusMapel.actions;
export default fokusMapel.reducer