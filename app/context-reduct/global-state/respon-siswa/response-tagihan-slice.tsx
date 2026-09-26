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
                    state.data[index] = action.payload;
                }
            },
            upsertResponTagihan(state, action:PayloadAction<ResponTagihanSlicer>){
                 const index = state.data.findIndex(s=>s.jenjang === action.payload.jenjang);
                if(index === -1){
                    state.data.push(action.payload);
                }else{
                    state.data[index] = action.payload;
                }
            },
        }
    }
)

export const {setResponTagihan, upsertResponTagihan} = ResponTagihanSlice.actions;
export default ResponTagihanSlice.reducer;