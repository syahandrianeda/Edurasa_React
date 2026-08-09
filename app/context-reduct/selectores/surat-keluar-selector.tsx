import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoSuratKeluar from "~/dtos/dto-surat-keluar";
import OrmSuratKeluar from "~/domain/surat-orm/orm-surat-keluar";
import { InstanceRiwayatIdAkun } from "./riwayat-id-akun-selector";
import { DtoSppdSelector } from "./dto-sppd-selector";
import DtoSuratMasuk from "~/dtos/dto-surat-masuk";
import { DtoSuratMasukSelector } from "./surat-masuk-selector";
import { selectAllSiswaDTO } from "./data-siswa-aktif";
import { InstanceOfRiwayatRombel } from "./riwayat-rombel-selector";

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
    DtoSuratMasukSelector,
    selectAllSiswaDTO,
    InstanceOfRiwayatRombel

],(dto, instanceAkun, dtoSppd, suratMasuk,siswa,riwayatRombel)=>{
    return new OrmSuratKeluar(dto,instanceAkun,dtoSppd,suratMasuk, siswa, riwayatRombel).build().data
})