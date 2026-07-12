import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { InterfaceMapelSheet } from "~/types/mapel/mapel"

export type MapelTypeSlice = {
    // dataMapel:InterfaceMapelSheet[],
    data:InterfaceMapelSheet[],
    name:'mapel',
    // loadedMapel:boolean
    loaded:boolean
}
const initialState:MapelTypeSlice = {
    data:[],
    name:'mapel',
    loaded:false
}
const mapel = createSlice({
    name:'mapelSlice',
    initialState,
    reducers:{
            setDataMapel(state, action:PayloadAction<InterfaceMapelSheet[]>){
                state.data = action.payload;
                state.loaded = true
            },
            setMapel(state, action:PayloadAction<InterfaceMapelSheet[]>){
                state.data = action.payload;
                state.loaded = true
            },
        }
    }
);

export const {setDataMapel, setMapel} = mapel.actions;
export default mapel.reducer