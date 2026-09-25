import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";

export type dataTabunganSlice ={
    nama_rombel:string,
    data:TabunganSheetType[],

}
export interface TabunganSliceType{
    data:dataTabunganSlice[]
    name:'tabungan'
    loaded:boolean
}

const initialState:TabunganSliceType = {
    data:[],
    name:'tabungan',
    loaded:false
}

const TabunganSlice = createSlice({
    name:'tabungan',
    initialState,
    reducers:{
        setTabunganRombel(state, action:PayloadAction<dataTabunganSlice>){
            const index = state.data.findIndex(s=>s.nama_rombel === action.payload.nama_rombel);
            if(index === -1){
                state.data.push(action.payload);
            }else{
                state.data[index] = action.payload;
            }
        },
        upsertTabunganRombel(state, action:PayloadAction<dataTabunganSlice>){
            const index = state.data.findIndex(s=>s.nama_rombel === action.payload.nama_rombel);
            if(index === -1){
                state.data.push(action.payload);
            }else{
                state.data[index] = action.payload;
            }
            state.loaded = action.payload.data.length > 0
        }
    }
})

export const {setTabunganRombel, upsertTabunganRombel} = TabunganSlice.actions;
export default TabunganSlice.reducer;