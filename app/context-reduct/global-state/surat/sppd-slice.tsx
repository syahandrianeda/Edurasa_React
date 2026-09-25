import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";
// import type { SppdSheetType } from "~/types/surat/surat-keluar-sheet-type";


type SppdSliceType={
    data:SppdSheetType[],
    name:'sppd',
    loaded:boolean;
}

const initialState:SppdSliceType = {
    data: [],
    name:'sppd',
    loaded:false
}

const SppdReducer = createSlice({
    name:'sppd',
    initialState,
    reducers:{
            setSppd(state, action: PayloadAction<SppdSheetType[]>) {
                state.loaded = true
                state.data = action.payload;
                state.name = 'sppd'
                
            },
            upsertSppd(
                                   state,
                                   action: PayloadAction<SppdSheetType[]>
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
                                   state.name = 'sppd'
                                   state.data = Array.from(dataMap.values());
                                   state.loaded=action.payload.length>0
                                   },
            
        }
    }
);


export const { setSppd, upsertSppd} = SppdReducer.actions
export default SppdReducer.reducer