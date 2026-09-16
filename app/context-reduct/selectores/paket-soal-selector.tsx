import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AtpHasManySoalSelector } from "./bank-soal-selector";
import DtoPaketSoalSheetClass from "~/dtos/dto-paket-soal-sheet-class";
import {  PublikasiPaketSoalAppStaticSelector } from "./publikasi-paket-soal";


export const PurePaketSoalSelector = (state:RootState)=> state.paketSoal.data;

export const instancePaketSoalSheet = createSelector(
    [
        PurePaketSoalSelector,
        AtpHasManySoalSelector,
        (state:RootState)=>state.fokusRombel.value,
        // PublikasiPaketSoalAppSelector
        PublikasiPaketSoalAppStaticSelector
    ],
    (paketSoal, atpHasBankSoal, rombel, publikasi)=>{
        if(!atpHasBankSoal || !paketSoal || paketSoal.length===0 ||!rombel) return;
        
        return  new DtoPaketSoalSheetClass(paketSoal, atpHasBankSoal.data, rombel, publikasi).init();
    }
)