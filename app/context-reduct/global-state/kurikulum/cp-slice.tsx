import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface dataCPSlice extends KurmerProperty<ElemenCpType>{
    name:'elemen_cp',
    loaded:boolean
};

const initialState:dataCPSlice = {
    name:'elemen_cp',
    data:[],
    loaded:false
}


const CP = createSlice({
    name:'CP',
    initialState:initialState,
    reducers:{
        setCp(state, action:PayloadAction<ElemenCpType[]>){
            state.data = action.payload
            state.loaded = true;
        },
        upsertCp(
            state,
            action: PayloadAction<ElemenCpType[]>
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
            state.name = "elemen_cp";
        },
        
        
    }
});

export const {setCp, upsertCp} = CP.actions;
export default CP.reducer;


