import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { PaketSoalDTO } from "~/dtos/dto-paket-soal";

export const PurePaketSoalSelector = (state:RootState)=> state.paketSoal.data;

// export const DtoPaketSoalSelector = createSelector(
//     [PurePaketSoalSelector],
//     (dto)=>PaketSoalDTO.arrayFromSheet(dto)
// )

// export const DtoPaketSoalDomainApp = createSelector(
//     [
//         DtoPaketSoalSelector
//     ],
//     (dto)=> {
//         return []
//     }
// )
