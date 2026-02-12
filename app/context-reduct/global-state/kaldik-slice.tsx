import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KaldikType } from "~/types/kaldik";

type KaldikSliceType={
    data:KaldikType[]
    loaded:boolean;
}

const initialState:KaldikSliceType = {
    data: [],
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
                
            }
        }
    }
);


export const { setKaldik, setLoadedKaldik} = kaldik.actions
export default kaldik.reducer