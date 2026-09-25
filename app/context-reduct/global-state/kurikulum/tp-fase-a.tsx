import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export interface FaseASliceType extends KurmerProperty<FaseKurikulumType>{
    loaded:boolean
}
const initialState:FaseASliceType = {
    name:"faseA",
    data:[],
    loaded:false
};
const FaseA = createSlice({
    name: "faseA",
    initialState,
    reducers:{
        setFaseA(state, action:PayloadAction<FaseKurikulumType[]>){
            state.name="faseA";
            state.data = action.payload;
            state.loaded = true;
        },
        upsertFaseA(
                state,
                action: PayloadAction<FaseKurikulumType[]>
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
                state.name = 'faseA'
                state.data = Array.from(dataMap.values());
                state.loaded=action.payload.length>0
                },
        
    }
})
export const {setFaseA,upsertFaseA} = FaseA.actions;
export default FaseA.reducer;