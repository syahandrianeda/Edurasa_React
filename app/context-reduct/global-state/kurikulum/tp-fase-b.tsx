import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export interface FaseBSliceType extends KurmerProperty<FaseKurikulumType>{
    loaded:boolean
}
const initialState:FaseBSliceType = {
    name:"faseB",
    data:[],
    loaded:false
};
const FaseB = createSlice({
    name: "faseB",
    initialState,
    reducers:{
        setFaseB(state, action:PayloadAction<FaseKurikulumType[]>){
            state.name="faseB";
            state.data = action.payload;
            state.loaded = true;
        },
        upsertFaseB(
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
                state.name = 'faseB'
                state.data = Array.from(dataMap.values());
                state.loaded=action.payload.length>0
                },
    }
})
export const {setFaseB, upsertFaseB} = FaseB.actions;
export default FaseB.reducer;