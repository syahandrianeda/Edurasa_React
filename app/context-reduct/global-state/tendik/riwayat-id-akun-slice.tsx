import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RiwayatAkunSheetType } from "~/types/tendik/riwayat-akun-sheet-type";
import type { upsertRiwayatRombel } from "../buku-induk/riwayat-rombel-slice";

export interface RiwayatIdAkunSliceType{
    name:'riwayat_id_akun',
    data:RiwayatAkunSheetType[],
    loaded:boolean
}

const initialState:RiwayatIdAkunSliceType={
    name:'riwayat_id_akun',
    data:[],
    loaded:false
}
const RiwayatIdAkunSlice = createSlice({    
    name:'RiwayatIdAkunSlice',
    initialState, 
    reducers:{
        setRiwayatIdAkun(state, action:PayloadAction<RiwayatAkunSheetType[]>){
            state.data = action.payload;
            state.name = 'riwayat_id_akun';
            state.loaded = true;
        },
        upsertRiwayatIdAkun(
                            state,
                            action: PayloadAction<RiwayatAkunSheetType[]>
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
                            state.name ='riwayat_id_akun'
                            state.data = Array.from(dataMap.values());
                            state.loaded=action.payload.length>0
                            },
        
    }
})

export const {setRiwayatIdAkun, upsertRiwayatIdAkun} = RiwayatIdAkunSlice.actions;
export default RiwayatIdAkunSlice.reducer;