import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RekapKategoriSementaraType } from "./RekapKategoriSementaraType"
import type { AkhirSemesterRekapSheetType } from "~/types/penilaian/rekap_sementara_sheet_type"

type AkhirSemesterSliceType={
    data: RekapKategoriSementaraType<AkhirSemesterRekapSheetType>[],
    loaded:boolean,
    name: 'akhir_semester'
}

const initialState:AkhirSemesterSliceType = {
    data:[],
    loaded:false,
    name: 'akhir_semester'
}

const AkhirSemesterSlice = createSlice(
    {
        name:'akhir_semester',
        initialState, 
        reducers: {
            setAkhirSemester(state, action:PayloadAction<RekapKategoriSementaraType<AkhirSemesterRekapSheetType>>){
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
            upsertAkhirSemester(state, action:PayloadAction<RekapKategoriSementaraType<AkhirSemesterRekapSheetType>>){
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

export const {setAkhirSemester, upsertAkhirSemester} = AkhirSemesterSlice.actions;
export default AkhirSemesterSlice.reducer;