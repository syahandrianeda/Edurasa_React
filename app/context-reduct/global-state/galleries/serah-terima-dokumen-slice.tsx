import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SerahTerimaDokumenSheetType } from "~/types/galleries/serah-terima-dokumen-sheet-type";

type SerahTerimaDokumenSliceType={
    data:SerahTerimaDokumenSheetType[],
    name:'serah_terima_dokumen',
    loaded:boolean
}

const initialState:SerahTerimaDokumenSliceType={
    data:[],
    name:'serah_terima_dokumen',
    loaded:false
}

const SerahTerimaDokumenSlice = createSlice({
    name:'SerahTerimaDokumenSlice',
    initialState, 
    reducers:{
        setSerahTerimaDokumen(state, action: PayloadAction<SerahTerimaDokumenSheetType[]>) {
                        state.loaded = true
                        state.data = action.payload;
                        state.name = 'serah_terima_dokumen'
                        
                    },
        upsertSerahTerimaDokumen(
            state,
            action: PayloadAction<SerahTerimaDokumenSheetType[]>
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
            state.name = "serah_terima_dokumen";
        },
                    
    }
});

export const {setSerahTerimaDokumen,upsertSerahTerimaDokumen} = SerahTerimaDokumenSlice.actions;
export default SerahTerimaDokumenSlice.reducer;