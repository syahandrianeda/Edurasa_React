import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type"

type ResponTagihanSlicer={
    data: NilaiSiswaSheetType[],
    jenjang: number
}

type ResponTagihanSliceType={
    data: ResponTagihanSlicer[],
    loaded:boolean,
    name: 'respon_tagihan'
}

const initialState:ResponTagihanSliceType = {
    data:[],
    loaded:false,
    name: 'respon_tagihan'
}

const ResponTagihanSlice = createSlice(
    {
        name:'responTagihan',
        initialState, 
        reducers: {
            setResponTagihan(state, action:PayloadAction<ResponTagihanSlicer>){
                 const index = state.data.findIndex(s=>s.jenjang === action.payload.jenjang);
                if(index === -1){
                    state.data.push(action.payload);
                }else{
                    // state.data[index] = action.payload;
                    const dataTab = state.data[index]
                    dataTab.data = [...dataTab.data, ...action.payload.data]
                    state.data[index] = dataTab;
                }
            },
            upsertResponTagihan(state, action:PayloadAction<ResponTagihanSlicer>){
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
                
            },
        }
    }
)

export const {setResponTagihan, upsertResponTagihan} = ResponTagihanSlice.actions;
export default ResponTagihanSlice.reducer;