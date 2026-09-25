import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import {type KurmerProperty } from "./kurmer-property";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export interface AtpSliceType extends KurmerProperty<AtpKurikulumType>{
    loaded:boolean
}
const initialState:AtpSliceType = {
    name:"Atp",
    data:[],
    loaded:false
};
const Atp = createSlice({
    name: "Atp",
    initialState,
    reducers:{
        setAtp(state, action:PayloadAction<AtpKurikulumType[]>){
            state.name="Atp";
            state.data = action.payload;
            state.loaded = true;
        },
        upsertAtp(
            state,
            action: PayloadAction<AtpKurikulumType[]>
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
            state.name ="Atp";
        },
        
    }
})
export const {setAtp, upsertAtp} = Atp.actions;
export default Atp.reducer;