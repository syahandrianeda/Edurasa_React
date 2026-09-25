import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";


export interface PangkatGolonganSliceType{
    name:'pangkat_golongan',
    data:PangkatGolonganSheetType[],
    loaded:boolean
}

const initialState:PangkatGolonganSliceType={
    name:'pangkat_golongan',
    data:[],
    loaded:false
}
const PangkatGolonganSlice = createSlice({    
    name:'PangkatGolonganSlice',
    initialState, 
    reducers:{
        setPangkatGolongan(state, action:PayloadAction<PangkatGolonganSheetType[]>){
            state.data = action.payload;
            state.name = 'pangkat_golongan';
            state.loaded = true;
        },
        upsertPangkatGolongan(
                            state,
                            action: PayloadAction<PangkatGolonganSheetType[]>
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
                            state.name ='pangkat_golongan'
                            state.data = Array.from(dataMap.values());
                            state.loaded=action.payload.length>0
                            },
    }
})

export const {setPangkatGolongan, upsertPangkatGolongan} = PangkatGolonganSlice.actions;
export default PangkatGolonganSlice.reducer;