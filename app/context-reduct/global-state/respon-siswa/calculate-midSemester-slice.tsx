import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type"
import type { RekapKategoriSementaraType } from "./RekapKategoriSementaraType"
import type { MidSemesterRekapSheetType } from "~/types/penilaian/rekap_sementara_sheet_type"

type RekapMidSemesterSliceType={
    data: RekapKategoriSementaraType<MidSemesterRekapSheetType>[],
    loaded:boolean,
    name: 'mid_semester'
}

const initialState:RekapMidSemesterSliceType = {
    data:[],
    loaded:false,
    name: 'mid_semester'
}

const RekapMidSemesterSlice = createSlice(
    {
        name:'mid_semester',
        initialState, 
        reducers: {
            setRekapMidSemester(state, action:PayloadAction<RekapKategoriSementaraType<MidSemesterRekapSheetType>>){
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
            upsertRekapMidSemester(state, action:PayloadAction<RekapKategoriSementaraType<MidSemesterRekapSheetType>>){
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

export const {setRekapMidSemester, upsertRekapMidSemester} = RekapMidSemesterSlice.actions;
export default RekapMidSemesterSlice.reducer;