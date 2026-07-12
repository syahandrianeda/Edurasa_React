import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KaldikType } from "~/types/kaldik";

type KaldikSliceType={
    data:KaldikType[],
    name:'kalender',
    loaded:boolean;
}

const initialState:KaldikSliceType = {
    data: [],
    name:'kalender',
    loaded:false
}

const kaldik = createSlice({
    name:'dataKaldik',
    initialState,
    reducers:{
            setKaldik(state, action: PayloadAction<KaldikSliceType>) {
                state.loaded = action.payload.loaded;
                state.data = action.payload.data;
                
            },
            setLoadedKaldik(state, action: PayloadAction<KaldikSliceType>) {
                state.loaded = action.payload.loaded;
                
            },
            setKaldikArray(state, action: PayloadAction<KaldikType[]>) {
                state.loaded = true;
                state.data = action.payload
                
            },
        }
    }
);


export const { setKaldik, setLoadedKaldik, setKaldikArray} = kaldik.actions
export default kaldik.reducer