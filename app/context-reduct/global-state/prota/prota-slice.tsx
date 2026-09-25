import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { protaSheet } from "~/types/kurikulum/prota-orm"

export type ProtaSliceType={
    data:protaSheet[],
    name:'prota',
    loaded:Boolean
}
export const InitialState:ProtaSliceType = {
    data:[],
    name:'prota',
    loaded:false
}   

export const ProtaSlice = createSlice({
    name:'prota',
    initialState:InitialState,
    reducers:{
        setDataProta(state, action:PayloadAction<protaSheet[]>){
            state.data = action.payload
            state.loaded = true
        },
        
                 upsertDataProta(
                                        state,
                                        action: PayloadAction<protaSheet[]>
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
                                        state.name = 'prota'
                                        state.data = Array.from(dataMap.values());
                                        state.loaded=action.payload.length>0
                                        },
    }
});

export const {setDataProta, upsertDataProta} = ProtaSlice.actions;
export default ProtaSlice.reducer;

