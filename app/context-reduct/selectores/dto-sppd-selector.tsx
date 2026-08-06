import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoRiwayatIdAkun from "~/dtos/dto-riwayat-id-akun";
import DtoSppd from "~/dtos/dto-sppd";

export const SppdSelector = (state:RootState)=> state.sppd.data;

export const DtoSppdSelector = createSelector(
    SppdSelector,
    (sppd)=> DtoSppd.arrayToApp(sppd)
);
