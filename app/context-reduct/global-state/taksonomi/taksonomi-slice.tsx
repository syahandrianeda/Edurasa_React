import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaksonomiSheetType } from "~/types/taksonomi/taksonomi-sheet";


export interface TaksonomiSliceType{
    name:'taksonomi_bloom',
    data:TaksonomiSheetType[],
    loaded:boolean
}

const initialState:TaksonomiSliceType={
    name:'taksonomi_bloom',
    data:[],
    loaded:false
}
const TaksonomiBloom = createSlice({
        name:'TaksonomiBloom',
        initialState, 
        reducers:{
            setTaksonomiBloom(state, action:PayloadAction<TaksonomiSheetType[]>){
                state.data = action.payload;
                state.name = 'taksonomi_bloom';
                state.loaded = true;
            }
        }
    }
);

export const {setTaksonomiBloom} = TaksonomiBloom.actions;
export default TaksonomiBloom.reducer;