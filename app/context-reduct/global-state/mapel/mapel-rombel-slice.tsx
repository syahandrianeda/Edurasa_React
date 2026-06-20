import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel"

export type MapelRombelSliceType = {
    dataMapelRombel:jp_mapelSheet[],
    loadedDataMapelRombel:boolean
}
const initialState:MapelRombelSliceType = {
    dataMapelRombel:[],
    loadedDataMapelRombel:false
}

const mapelRombel = createSlice({
    name:'mapelRombel',
    initialState,
    reducers:{
        setDataMapelRombel(state, action:PayloadAction<jp_mapelSheet[]>){
            state.dataMapelRombel = action.payload
            state.loadedDataMapelRombel = true
        }
    }
});
export const {setDataMapelRombel} = mapelRombel.actions;
export default mapelRombel.reducer;