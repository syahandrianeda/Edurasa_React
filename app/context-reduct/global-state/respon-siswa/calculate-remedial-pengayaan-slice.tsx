import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type"
import type { RekapKategoriSementaraType } from "./RekapKategoriSementaraType"
import type { RemedialPengayaanRekapSheetType } from "~/types/penilaian/rekap_sementara_sheet_type"

type RemedialPengayaanSliceType={
    data: RekapKategoriSementaraType<RemedialPengayaanRekapSheetType>[],
    loaded:boolean,
    name: 'remedial_pengayaan'
}

const initialState:RemedialPengayaanSliceType = {
    data:[],
    loaded:false,
    name: 'remedial_pengayaan'
}

const UsSlice = createSlice(
    {
        name:'remedial_pengayaan',
        initialState, 
        reducers: {
            setRemedialPengayaan(state, action:PayloadAction<RekapKategoriSementaraType<RemedialPengayaanRekapSheetType>>){
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
            },
            upsertRemedialPengayaan(state, action:PayloadAction<RekapKategoriSementaraType<RemedialPengayaanRekapSheetType>>){
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

export const {setRemedialPengayaan, upsertRemedialPengayaan} = UsSlice.actions;
export default UsSlice.reducer;