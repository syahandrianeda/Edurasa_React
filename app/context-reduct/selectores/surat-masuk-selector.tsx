import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoSuratMasuk from "~/dtos/dto-surat-masuk";

export const PureSuratMasukSelector = (state:RootState)=>state.suratMasuk.data;
export const DtoSuratMasukSelector = createSelector(
    [
        PureSuratMasukSelector
    ],
    (dto)=>DtoSuratMasuk.arrayToApp(dto).filter(s=>s.status === 'diarsipkan')
)