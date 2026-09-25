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
            upsertKaldikArray(
                                state,
                                action: PayloadAction<KaldikType[]>
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
                                state.name ='kalender'
                                state.data = Array.from(dataMap.values());
                                state.loaded=action.payload.length>0
                                },
            
            upsertKaldik(
                                state,
                                action: PayloadAction<KaldikSliceType>
                            ) {
                                const newData = action.payload.data;
                    
                                const dataMap = new Map(
                                    state.data.map(item => [item.idbaris, item])
                                );
                    
                                for (const item of newData) {
                                    dataMap.set(item.idbaris, {
                                        ...dataMap.get(item.idbaris),
                                        ...item,
                                    });
                                }
                                state.name = 'kalender'
                                state.data = Array.from(dataMap.values());
                                state.loaded= newData.length>0
                                },
            
        }
    }
);


export const { setKaldik, setLoadedKaldik, setKaldikArray, upsertKaldik, upsertKaldikArray} = kaldik.actions
export default kaldik.reducer