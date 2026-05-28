import DTOAbsensiToApp from "~/dtos/dto-absensi-to-app";
import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { instanceOfKaldik, selectKaldik } from "./kaldik-selector";
import { selectAllSiswaDTO, selectSiswaWithValidation } from "./data-siswa-aktif";
import OrmAbsensi from "~/domain/absensi/orm-absensi";
import OrmKaldik from "~/domain/kaldik/orm-kaldik";

export const AbsensiSiswaSelector = (state:RootState)=>state.absensiSiswa.dataAbsensi;

export const AbsensiSiswaSelectorDTO = createSelector(
    [AbsensiSiswaSelector],
    (dto)=>DTOAbsensiToApp.fromSelectorArray(dto)
)
export const AbsensiRombelAktifDTO = createSelector(
    [
        AbsensiSiswaSelectorDTO,
        (state:RootState)=>state.fokusRombel.value
    ],
    (dataAbsen, fokusRombel)=>{
        return dataAbsen.find(s=> s.nama_rombel === fokusRombel)
                ;//.map(m=>m.data);
    }
)
export const OrmAbsensiSelector = createSelector(
    [
        AbsensiSiswaSelectorDTO,
        instanceOfKaldik,
        selectSiswaWithValidation,
        (state:RootState)=>state.fokusRombel.value??'1A'
    ],
    (dataAbsen, kaldikData, selectSiswaWithValidation, fokusRombel)=> {
        return new OrmAbsensi(
            kaldikData, 
            selectSiswaWithValidation,
            dataAbsen,
            fokusRombel
        )
    }
);