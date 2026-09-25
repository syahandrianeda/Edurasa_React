import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export interface FaseCSliceType extends KurmerProperty<FaseKurikulumType>{
    loaded:boolean
}
const initialState:FaseCSliceType = {
    name:"faseC",
    data:[],
    loaded:false
};
const FaseC = createSlice({
    name: "faseC",
    initialState,
    reducers:{
        setFaseC(state, action:PayloadAction<FaseKurikulumType[]>){
            state.name="faseC";
            state.data = action.payload;
            state.loaded = true;
        },
        upsertFaseC(
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
                state.name = 'faseC'
                state.data = Array.from(dataMap.values());
                state.loaded=action.payload.length>0
                },
    }
})
export const {setFaseC, upsertFaseC} = FaseC.actions;
export default FaseC.reducer;