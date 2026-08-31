import DtoBankSoal from "~/dtos/dto-bank-soal";
import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const PureBankSoalSelector = (s:RootState)=>s.bankSoal.data;
export const DtoBankSoalSelector = createSelector(
    [
        PureBankSoalSelector
    ],
    (data)=>DtoBankSoal.arrrayFromSheetToApp(data).sort((a, b)=>b.idbaris - a.idbaris))