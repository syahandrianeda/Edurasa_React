import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel"

export interface MapelRombelSliceType extends SliceType<jp_mapelSheet> {
    // dataMapelRombel:jp_mapelSheet[],
    data:jp_mapelSheet[],
    name:'jp_mapel',
    // loadedDataMapelRombel:boolean
    loaded:boolean
}
const initialState:MapelRombelSliceType = {
    // dataMapelRombel:[],
    data:[],
    name:'jp_mapel',
    loaded:false
}

const mapelRombel = createSlice({
    name:'mapelRombel',
    initialState,
    reducers:{
        setDataMapelRombel(state, action:PayloadAction<jp_mapelSheet[]>){
            // state.dataMapelRombel = action.payload
            state.data = action.payload;
            state.loaded = true
        },
        setJpMapel(state, action:PayloadAction<jp_mapelSheet[]>){
            // state.dataMapelRombel = action.payload
            state.data = action.payload;
            state.loaded = true
        },
    }
});
export const {setDataMapelRombel, setJpMapel} = mapelRombel.actions;
export default mapelRombel.reducer;