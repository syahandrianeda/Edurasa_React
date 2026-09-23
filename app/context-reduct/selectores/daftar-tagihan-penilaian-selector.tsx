import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { PurePaketSoalSelector } from "./paket-soal-selector";
import { AtpHasManySoalSelector } from "./bank-soal-selector";
import { PublikasiPaketSoalAppStaticSelector } from "./publikasi-paket-soal";
import DtoPaketSoalSheetClass from "~/dtos/dto-paket-soal-sheet-class";
import TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";
import { DataSiswaAktifJenjang, DataSiswaAktifWithValidation, selectSiswaWithValidation } from "./data-siswa-aktif";

export const InstanceDataTagihanPenilaianSector = createSelector(
    [
        PurePaketSoalSelector,
        AtpHasManySoalSelector,
        (state:RootState)=>state.fokusRombel.value,
        PublikasiPaketSoalAppStaticSelector,
        selectSiswaWithValidation

    ],
    (paketSoal, atpHasBankSoal, rombel, publikasi,siswa)=>{
        if(!atpHasBankSoal || !paketSoal || paketSoal.length===0 ||!rombel) return;
        
        return  new TagihanPenilaianClass(paketSoal, atpHasBankSoal.data, rombel, publikasi, siswa).init();
    }
)