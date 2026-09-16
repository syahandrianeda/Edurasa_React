import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { sheetKurikulum_jadwalMapel, sheetKurikulum_kegiatanNonKbm, sheetKurikulum_prota } from "../../by-sheet/kurikulum";
import { sheetKaldik_kalender } from "../../by-sheet/kaldik";
import { sheetBankSoal_bankSoal, sheetBankSoal_paketSoal, sheetBankSoal_publikasiPaket, sheetBankSoal_taksonomiBloom } from "../../by-sheet/bank-soal";
import { defineDataSheetNeedFase } from "../kurikulum/fase-needed";
import { CpNeeded } from "../kurikulum/cp-needed";

export function defineCreateItemSoalNeeded(rombel:string):DataSheetNeeeded[]{
    const fase = defineDataSheetNeedFase(rombel)
    return [
        ...CpNeeded, 
        fase,
        sheetKurikulum_prota,
        sheetKurikulum_jadwalMapel, 
        sheetKaldik_kalender,
        sheetKurikulum_kegiatanNonKbm,
        sheetBankSoal_bankSoal,
        sheetBankSoal_taksonomiBloom,
        sheetBankSoal_paketSoal,
        sheetBankSoal_publikasiPaket
    ]
}