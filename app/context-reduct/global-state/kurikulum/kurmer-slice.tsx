import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum"
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum"

export type KurmerSliceType={
    dataCp:ElemenCpType[],
    loadedCp:boolean,
    dataTpFaseA:FaseKurikulumType[],
    loadedTpFaseA:boolean,
    dataTpFaseB:FaseKurikulumType[],
    loadedTpFaseB:boolean,
    dataTpFaseC:FaseKurikulumType[],
    loadedTpFaseC:boolean,
    dataAtp:AtpKurikulumType[],
    loadedAtp:boolean
}


const initialKurmerState:KurmerSliceType={
    dataCp:[],
    loadedCp:false,
    dataTpFaseA:[],
    loadedTpFaseA:false,
    dataTpFaseB:[],
    loadedTpFaseB:false,
    dataTpFaseC:[],
    loadedTpFaseC:false,
    dataAtp:[],
    loadedAtp:false
}

const kurmer = createSlice({
    name:'kurikulumKurmer',
    initialState:initialKurmerState,
    reducers:{
        setKurmerCp(state, action:PayloadAction<ElemenCpType[]>){
            state.dataCp = action.payload,
            state.loadedCp=action.payload.length>0
        },
        upsertKurmerCp(
            state,
            action: PayloadAction<ElemenCpType[]>
        ) {
            const newData = action.payload;

            const dataMap = new Map(
                state.dataCp.map(item => [item.idbaris, item])
            );

            for (const item of newData) {
                dataMap.set(item.idbaris, {
                    ...dataMap.get(item.idbaris),
                    ...item,
                });
            }

            state.dataCp = Array.from(dataMap.values());
            state.loadedCp=action.payload.length>0
            // state.loaded = true;
            // state.name = "paket_soal";
        },
        
        setKurmerTpFaseA(state, action:PayloadAction<FaseKurikulumType[]>){
            state.dataTpFaseA = action.payload,
            state.loadedTpFaseA=action.payload.length>0
        },
        upsertKurmerTpFaseA(
            state,
            action: PayloadAction<FaseKurikulumType[]>
        ) {
            const newData = action.payload;

            const dataMap = new Map(
                state.dataTpFaseA.map(item => [item.idbaris, item])
            );

            for (const item of newData) {
                dataMap.set(item.idbaris, {
                    ...dataMap.get(item.idbaris),
                    ...item,
                });
            }

            state.dataTpFaseA = Array.from(dataMap.values());
            state.loadedTpFaseA=action.payload.length>0
        },
        
        setKurmerTpFaseB(state, action:PayloadAction<FaseKurikulumType[]>){
            state.dataTpFaseB = action.payload,
            state.loadedTpFaseB=action.payload.length>0
        },
        upsertKurmerTpFaseB(
            state,
            action: PayloadAction<FaseKurikulumType[]>
        ) {
            const newData = action.payload;

            const dataMap = new Map(
                state.dataTpFaseB.map(item => [item.idbaris, item])
            );

            for (const item of newData) {
                dataMap.set(item.idbaris, {
                    ...dataMap.get(item.idbaris),
                    ...item,
                });
            }

            state.dataTpFaseB = Array.from(dataMap.values());
            state.loadedTpFaseB=action.payload.length>0
        },
        setKurmerTpFaseC(state, action:PayloadAction<FaseKurikulumType[]>){
            state.dataTpFaseC = action.payload,
            state.loadedTpFaseC=action.payload.length>0
        },
        upsertKurmerTpFaseC(
            state,
            action: PayloadAction<FaseKurikulumType[]>
        ) {
            const newData = action.payload;

            const dataMap = new Map(
                state.dataTpFaseC.map(item => [item.idbaris, item])
            );

            for (const item of newData) {
                dataMap.set(item.idbaris, {
                    ...dataMap.get(item.idbaris),
                    ...item,
                });
            }

            state.dataTpFaseC = Array.from(dataMap.values());
            state.loadedTpFaseC=action.payload.length>0
        },
        setKurmerAtp(state, action:PayloadAction<AtpKurikulumType[]>){
            state.dataAtp = action.payload
            state.loadedAtp=action.payload.length>0
        },
        upsertKurmerAtp(
            state,
            action: PayloadAction<AtpKurikulumType[]>
        ) {
            const newData = action.payload;

            const dataMap = new Map(
                state.dataAtp.map(item => [item.idbaris, item])
            );

            for (const item of newData) {
                dataMap.set(item.idbaris, {
                    ...dataMap.get(item.idbaris),
                    ...item,
                });
            }

            state.dataAtp = Array.from(dataMap.values());
            state.loadedAtp=action.payload.length>0
        },
    }
});


export const { setKurmerCp, setKurmerTpFaseA, setKurmerTpFaseB, setKurmerTpFaseC, setKurmerAtp,
    upsertKurmerCp, upsertKurmerTpFaseA, upsertKurmerTpFaseB, upsertKurmerTpFaseC, upsertKurmerAtp
} = kurmer.actions
export default kurmer.reducer
