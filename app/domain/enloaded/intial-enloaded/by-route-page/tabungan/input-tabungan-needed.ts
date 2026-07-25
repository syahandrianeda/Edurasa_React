import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { sheet, sheetTabungan_kategoriAkses } from "../../by-sheet/tabungan";
import { namaTab } from "~/lib/nama-tab-environment";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";
import { sheetAkun_dataSiswa } from "../../by-sheet/akun";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { sheetKaldik_kalender } from "../../by-sheet/kaldik";

export const defineTabunganRombelNeeded = (rombel?:string) :DataSheetNeeeded[]=>{
    const user = getSessionApp();
    const sheetRombel = rombel ?? getSessionRombel();
    return [
            sheetAkun_dataSiswa,
            sheetKaldik_kalender,
            {sheet, tab:`${namaTab('tabungan')}_${sheetRombel}`},
            {sheet, tab:`${namaTab('keuangan')}_${(user as UserPtk)?.id}`},
            sheetTabungan_kategoriAkses,
        ]
}
export const defineTabunganRombelNeededRedirect = (rombel?:string) :DataSheetNeeeded[]=>{
    const user = getSessionApp();

    return [
            sheetAkun_dataSiswa,
            sheetKaldik_kalender,
            {sheet, tab:`${namaTab('keuangan')}_${(user as UserPtk)?.id}`},
            sheetTabungan_kategoriAkses,
    
    ]
}