import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen";

type TransaksiSerahTerimaDokumenSliceType={
    data:TransaksiSerahTerimaDokumenSheetType[],
    name:'transaksi_serah_terima',
    loaded:boolean
}

const initialState:TransaksiSerahTerimaDokumenSliceType={
    data:[],
    name:'transaksi_serah_terima',
    loaded:false
}

const TransaksiTransaksiSerahTerimaDokumenSlice = createSlice({
    name:'TransaksiSerahTerimaDokumenSlice',
    initialState, 
    reducers:{
        setTransaksiSerahTerimaDokumen(state, action: PayloadAction<TransaksiSerahTerimaDokumenSheetType[]>) {
                        state.loaded = true
                        state.data = action.payload;
                        state.name = 'transaksi_serah_terima'
                        
                    },
    
            upsertTransaksiSerahTerimaDokumen(
                state,
                action: PayloadAction<TransaksiSerahTerimaDokumenSheetType[]>
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
                state.name = "transaksi_serah_terima";
            },
    }
});

export const {setTransaksiSerahTerimaDokumen,upsertTransaksiSerahTerimaDokumen} = TransaksiTransaksiSerahTerimaDokumenSlice.actions;
export default TransaksiTransaksiSerahTerimaDokumenSlice.reducer;