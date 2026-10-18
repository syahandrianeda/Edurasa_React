import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { PurePaketSoalSelector } from "./paket-soal-selector";
import { AtpHasManySoalSelector } from "./bank-soal-selector";
import { PublikasiPaketSoalAppStaticSelector } from "./publikasi-paket-soal";
import TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";
import { selectSiswaWithValidation } from "./data-siswa-aktif";
import { responTagihanCurrentJenjang } from "./daftar-tagihan-penilaian-siswa-selector";
import { dtoSheetRekapAsli } from "./rekap-sheet-kategori-assesment-selector";

export const InstanceDataTagihanPenilaianSector = createSelector(
    [
        PurePaketSoalSelector,
        AtpHasManySoalSelector,
        (state:RootState)=>state.fokusRombel.value,
        PublikasiPaketSoalAppStaticSelector,
        selectSiswaWithValidation,
        responTagihanCurrentJenjang,
        dtoSheetRekapAsli
        
    ],
    (paketSoal, atpHasBankSoal, rombel, publikasi,siswa, respon, sheetRekap)=>{
        if(!atpHasBankSoal || !paketSoal || paketSoal.length===0 ||!rombel) return;
        
        return  new TagihanPenilaianClass(paketSoal, atpHasBankSoal.data, rombel, publikasi, siswa, respon, sheetRekap ).init();
    }
)