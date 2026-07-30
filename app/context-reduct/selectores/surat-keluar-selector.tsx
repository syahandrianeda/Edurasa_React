import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoSuratKeluar from "~/dtos/dto-surat-keluar";
import OrmSuratKeluar from "~/domain/surat-orm/orm-surat-keluar";

export const PureSuratKeluarSelector = (state:RootState)=> state.suratKeluar.data;//Prota;

export const DtoSuratKeluarSelector = createSelector(
    [
        PureSuratKeluarSelector
        
    ],
    (data)=>DtoSuratKeluar.arrayToApp(data).sort( (a, b) => b.idbaris - a.idbaris, ) 
)
export const DataOrmSuratKeluarSelector = createSelector([
    DtoSuratKeluarSelector
],(dto)=>new OrmSuratKeluar(dto).build().data)