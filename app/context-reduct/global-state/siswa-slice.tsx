import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { typeSourceFetch } from "~/configs/appscript-config";
import type { SiswaType } from "~/types/siswa"

type DataSiswa<SiswaType> ={
    // semua siswa baik yang aktif/maupun yang nonaktif
    allSiswa: SiswaType[] | []
    loaded: boolean,
    source?: typeSourceFetch
    loading?:boolean
}

const initialState: DataSiswa<SiswaType> = {
    allSiswa : [],
    loaded:false,
    loading:true

}

const dataSiswa = createSlice({
    name: 'dataSiswa',
    initialState,
    reducers:{
        setAllSiswa(state, action: PayloadAction<DataSiswa<SiswaType>>) {
            state.allSiswa = action.payload.allSiswa,
            state.loaded = action.payload.loaded,
            state.source = action.payload.source
            state.loading = action.payload.loading
        // state.token = action.payload.token
        },
        
        resetSiswa() {
            return initialState
        }
    }
});

export const { setAllSiswa, resetSiswa } = dataSiswa.actions
export default dataSiswa.reducer
