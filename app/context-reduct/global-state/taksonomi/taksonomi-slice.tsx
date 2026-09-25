import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaksonomiSheetType } from "~/types/taksonomi/taksonomi-sheet";


export interface TaksonomiSliceType{
    name:'taksonomi_bloom',
    data:TaksonomiSheetType[],
    loaded:boolean
}

const initialState:TaksonomiSliceType={
    name:'taksonomi_bloom',
    data:[],
    loaded:false
}
const TaksonomiBloom = createSlice({
        name:'TaksonomiBloom',
        initialState, 
        reducers:{
            setTaksonomiBloom(state, action:PayloadAction<TaksonomiSheetType[]>){
                state.data = action.payload;
                state.name = 'taksonomi_bloom';
                state.loaded = true;
            },
            upsertTaksonomiBloom(
                                state,
                                action: PayloadAction<TaksonomiSheetType[]>
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
                                state.name ='taksonomi_bloom'
                                state.data = Array.from(dataMap.values());
                                state.loaded=action.payload.length>0
                                },
            
            
        }
    }
);

export const {setTaksonomiBloom, upsertTaksonomiBloom} = TaksonomiBloom.actions;
export default TaksonomiBloom.reducer;