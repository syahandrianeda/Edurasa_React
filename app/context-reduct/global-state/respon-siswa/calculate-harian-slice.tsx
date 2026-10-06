import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type"
import type { RekapKategoriSementaraType } from "./RekapKategoriSementaraType"
import type { HarianRekapSheetType } from "~/types/penilaian/rekap_sementara_sheet_type"

type RekapHarianSliceType={
    data: RekapKategoriSementaraType<HarianRekapSheetType>[],
    loaded:boolean,
    name: 'harian'
}

const initialState:RekapHarianSliceType = {
    data:[],
    loaded:false,
    name: 'harian'
}

const RekapHarianSlice = createSlice(
    {
        name:'harian',
        initialState, 
        reducers: {
            setRekapHarian(state, action:PayloadAction<RekapKategoriSementaraType<HarianRekapSheetType>>){
                const index = state.data.findIndex(s=>s.jenjang === action.payload.jenjang);

                if(index === -1){
                    state.data.push(action.payload);
                    return;
                }
                
                const dataTab = state.data[index]
                
                action.payload.data.forEach(newItem => {
                    const itemIndex = dataTab.data.findIndex(
                        item => item.idbaris === newItem.idbaris
                    );

                    if (itemIndex === -1) {
                        dataTab.data.push(newItem);
                    } else {
                        dataTab.data[itemIndex] = newItem;
                    }
                });
                state.data[index].objekKosong = action.payload.objekKosong
                //  const index = state.data.findIndex(s=>s.jenjang === action.payload.jenjang);
                // if(index === -1){
                //     state.data.push(action.payload);
                // }else{
                //     // state.data[index] = action.payload;
                //     const dataTab = state.data[index]
                //     dataTab.data = [...dataTab.data, ...action.payload.data]
                //     state.data[index] = dataTab;
                // }
            },
            upsertRekapHarian(state, action:PayloadAction<RekapKategoriSementaraType<HarianRekapSheetType>>){
                const index = state.data.findIndex(s=>s.jenjang === action.payload.jenjang);

                if(index === -1){
                    state.data.push(action.payload);
                    return;
                }
                
                const dataTab = state.data[index]
                
                action.payload.data.forEach(newItem => {
                    const itemIndex = dataTab.data.findIndex(
                        item => item.idbaris === newItem.idbaris
                    );

                    if (itemIndex === -1) {
                        dataTab.data.push(newItem);
                    } else {
                        dataTab.data[itemIndex] = newItem;
                    }
                });
                state.data[index].objekKosong = action.payload.objekKosong
                //  const index = state.data.findIndex(s=>s.jenjang === action.payload.jenjang);
                // if(index === -1){
                //     state.data.push(action.payload);
                // }else{
                //     // state.data[index] = action.payload;
                //     const dataTab = state.data[index]
                //     dataTab.data = [...dataTab.data, ...action.payload.data]
                //     state.data[index] = dataTab;
                // }
            },
        }
    }
)

export const {setRekapHarian, upsertRekapHarian} = RekapHarianSlice.actions;
export default RekapHarianSlice.reducer;