import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoSuratKeluar from "~/dtos/dto-surat-keluar";
import OrmSuratKeluar from "~/domain/surat-orm/orm-surat-keluar";
import { InstanceRiwayatIdAkun } from "./riwayat-id-akun-selector";
import { DtoSppdSelector } from "./dto-sppd-selector";
import DtoSuratMasuk from "~/dtos/dto-surat-masuk";
import { DtoSuratMasukSelector } from "./surat-masuk-selector";

export const PureSuratKeluarSelector = (state:RootState)=> state.suratKeluar.data;//Prota;

export const DtoSuratKeluarSelector = createSelector(
    [
        PureSuratKeluarSelector
        
    ],
    (data)=>DtoSuratKeluar.arrayToApp(data).sort( (a, b) => b.idbaris - a.idbaris, ) 
)
export const DataOrmSuratKeluarSelector = createSelector([
    DtoSuratKeluarSelector,
    InstanceRiwayatIdAkun,
    DtoSppdSelector,
    DtoSuratMasukSelector
],(dto, instanceAkun, dtoSppd, suratMasuk)=>{
    return new OrmSuratKeluar(dto,instanceAkun,dtoSppd,suratMasuk).build().data
})