import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoRiwayatRombel from "~/dtos/dto-riwayat-rombel";
import RiwayatRombelClass from "~/domain/rombel/riwayat-rombel-class";
import { selectAllSiswaDTO } from "./data-siswa-aktif";

export const PureRiwayatRombel = (state:RootState)=>state.riwayatRombel.data;
export const DtoRiwayatRombelSelector = createSelector([
    PureRiwayatRombel
],(dto)=>DtoRiwayatRombel.arrayToApp(dto));

export const InstanceOfRiwayatRombel = createSelector([
    PureRiwayatRombel
], (data)=>new RiwayatRombelClass(data))

/**@deprecated */
export const AllSiswaBasedOnRiwayat = createSelector([
    selectAllSiswaDTO,
    InstanceOfRiwayatRombel
],
    (siswa, riwayat)=>{
        return riwayat.getAllSiswaInTapelHasRombel('2223')
    }
)