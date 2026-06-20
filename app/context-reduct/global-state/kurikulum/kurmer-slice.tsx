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
        setKurmerTpFaseA(state, action:PayloadAction<FaseKurikulumType[]>){
            state.dataTpFaseA = action.payload,
            state.loadedTpFaseA=action.payload.length>0
        },
        setKurmerTpFaseB(state, action:PayloadAction<FaseKurikulumType[]>){
            state.dataTpFaseB = action.payload,
            state.loadedTpFaseB=action.payload.length>0
        },
        setKurmerTpFaseC(state, action:PayloadAction<FaseKurikulumType[]>){
            state.dataTpFaseC = action.payload,
            state.loadedTpFaseC=action.payload.length>0
        },
        setKurmerAtp(state, action:PayloadAction<AtpKurikulumType[]>){
            state.dataAtp = action.payload
            state.loadedAtp=action.payload.length>0
        }
    }
});


export const { setKurmerCp, setKurmerTpFaseA, setKurmerTpFaseB, setKurmerTpFaseC, setKurmerAtp} = kurmer.actions
export default kurmer.reducer
