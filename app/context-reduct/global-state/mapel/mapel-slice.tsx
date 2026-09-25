import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { InterfaceMapelSheet } from "~/types/mapel/mapel"

export type MapelTypeSlice = {
    // dataMapel:InterfaceMapelSheet[],
    data:InterfaceMapelSheet[],
    name:'mapel',
    // loadedMapel:boolean
    loaded:boolean
}
const initialState:MapelTypeSlice = {
    data:[],
    name:'mapel',
    loaded:false
}
const mapel = createSlice({
    name:'mapelSlice',
    initialState,
    reducers:{
            setDataMapel(state, action:PayloadAction<InterfaceMapelSheet[]>){
                state.data = action.payload;
                state.loaded = true
            },
            setMapel(state, action:PayloadAction<InterfaceMapelSheet[]>){
                state.data = action.payload;
                state.loaded = true
            },
            upsertDataMapel(
                        state,
                        action: PayloadAction<InterfaceMapelSheet[]>
                    ) {
                        const newData = action.payload;
            
                        const dataMap = new Map(
                            state.data.map(item => [item.id, item])
                        );
            
                        for (const item of newData) {
                            dataMap.set(item.id, {
                                ...dataMap.get(item.id),
                                ...item,
                            });
                        }
                        // state.name = 
                        state.data = Array.from(dataMap.values());
                        state.loaded=action.payload.length>0
                        },
            upsertMapel(
                        state,
                        action: PayloadAction<InterfaceMapelSheet[]>
                    ) {
                        const newData = action.payload;
            
                        const dataMap = new Map(
                            state.data.map(item => [item.id, item])
                        );
            
                        for (const item of newData) {
                            dataMap.set(item.id, {
                                ...dataMap.get(item.id),
                                ...item,
                            });
                        }
                        // state.name = 
                        state.data = Array.from(dataMap.values());
                        state.loaded=action.payload.length>0
                        },
        }
    }
);

export const {setDataMapel, setMapel, upsertDataMapel, upsertMapel} = mapel.actions;
export default mapel.reducer