import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { InterfaceMapelSheet } from "~/types/mapel/mapel"

export type MapelTypeSlice = {
    dataMapel:InterfaceMapelSheet[],
    loadedMapel:Boolean
}
const initialState:MapelTypeSlice = {
    dataMapel:[],
    loadedMapel:false
}
const mapel = createSlice({
    name:'mapelSlice',
    initialState,
    reducers:{
            setDataMapel(state, action:PayloadAction<InterfaceMapelSheet[]>){
                state.dataMapel = action.payload
                state.loadedMapel = true
            }
        }
    }
);

export const {setDataMapel} = mapel.actions;
export default mapel.reducer