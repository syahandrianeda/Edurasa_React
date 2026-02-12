import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AbsensiSiswaSheetType, AbsensiSiswaType } from "~/types/absensi-siswa"

export type dataAbsensiTypeSlice = {
    data: AbsensiSiswaSheetType[],
    nama_rombel:string
}
type AbsensiSiswaSlice={
    dataAbsensi:dataAbsensiTypeSlice[]
}
const initialState:AbsensiSiswaSlice = {
    dataAbsensi: []
}

const Absensi = createSlice({
    name: 'absensiSiswa',
    initialState,
    reducers:{
        setAbsensiRombel(state, action:PayloadAction<dataAbsensiTypeSlice>){
            const index = state.dataAbsensi.findIndex(s=>s.nama_rombel === action.payload.nama_rombel);
            if(index === -1){
                state.dataAbsensi.push(action.payload);
            }else{
                state.dataAbsensi[index] = action.payload;
            }
        }
    }

});

export const { setAbsensiRombel, } = Absensi.actions
export default Absensi.reducer