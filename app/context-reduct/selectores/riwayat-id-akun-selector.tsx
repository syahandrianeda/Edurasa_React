import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoRiwayatIdAkun from "~/dtos/dto-riwayat-id-akun";
import RiwayatIdAkunClass from "~/domain/tendik/riwayat-id-akun-class";
import DtoPangkatGolongan from "~/dtos/dto-pangkat-golongan";
import { DtoPangkatGolonganSelector } from "./pangkat-golongan-selector";

export const RiwayatIdAkunSelector = (state:RootState)=> state.riwayatIdAkun.data;

export const DtoRiwayatIdAkunSelector = createSelector(
    RiwayatIdAkunSelector,
    (riwayatIdAkun)=> DtoRiwayatIdAkun.arrayNormalizeResponseToApp(riwayatIdAkun)
);

export const InstanceRiwayatIdAkun = createSelector(
    [
        DtoRiwayatIdAkunSelector
    ],
    (riwayatIdAkun)=>new RiwayatIdAkunClass(riwayatIdAkun))
