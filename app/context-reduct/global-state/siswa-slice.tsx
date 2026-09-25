import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { typeSourceFetch } from "~/configs/appscript-config";
import type { SiswaType } from "~/types/siswa"

export type DataSiswa<SiswaType> ={
    // semua siswa baik yang aktif/maupun yang nonaktif
    data: SiswaType[] 
    loaded: boolean,
    source?: typeSourceFetch
    loading?:boolean,
    name:'datasiswa',
}

const initialState: DataSiswa<SiswaType> = {
    data : [],
    loaded:false,
    loading:true,
    name:'datasiswa',

}

const dataSiswa = createSlice({
    name: 'dataSiswa',
    initialState,
    reducers:{
        setAllSiswa(state, action: PayloadAction<DataSiswa<SiswaType>>) {
            state.data = action.payload.data,
            state.loaded = action.payload.loaded,
            state.source = action.payload.source
            state.loading = action.payload.loading
        // state.token = action.payload.token
        },
        upsertAllSiswa(
                            state,
                            action: PayloadAction<DataSiswa<SiswaType>>
                        ) {
                            const newData = action.payload.data;
                
                            const dataMap = new Map(
                                state.data.map(item => [item.id, item])
                            );
                
                            for (const item of newData) {
                                dataMap.set(item.id, {
                                    ...dataMap.get(item.id),
                                    ...item,
                                });
                            }
                            state.name ='datasiswa'
                            state.data = Array.from(dataMap.values());
                            state.loaded= newData.length>0
                            },
        
        resetSiswa() {
            return initialState
        }
    }
});

export const { setAllSiswa, resetSiswa, upsertAllSiswa } = dataSiswa.actions
export default dataSiswa.reducer
