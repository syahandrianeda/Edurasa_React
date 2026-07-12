import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { sheetKurikulum_atp, sheetKurikulum_elemenCp, sheetKurikulum_faseA, sheetKurikulum_faseB, sheetKurikulum_faseC, sheetKurikulum_jpMapel, sheetKurikulum_mapel, sheetKurikulum_settingJadwal } from "../../by-sheet/kurikulum";
import { sheetAkun_dataSiswa } from "../../by-sheet/akun";
import { getNumberFromString } from "~/lib/get-number";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { defineDataSheetNeedFase } from "./fase-needed";

export const CpNeeded:DataSheetNeeeded[]=[
    sheetAkun_dataSiswa,
    sheetKurikulum_mapel,
    sheetKurikulum_jpMapel,
    sheetKurikulum_settingJadwal,
    sheetKurikulum_elemenCp,
    sheetKurikulum_atp,
    
]
export const defineCpNeeded = (rombel:string):DataSheetNeeeded[]=>{
    const fase = defineDataSheetNeedFase(rombel)
    
    return [...CpNeeded, fase];
}
/** agar semantic aja */
export const defineCpTpAtpNeeded = (rombel:string):DataSheetNeeeded[]=>{
    const fase = defineDataSheetNeedFase(rombel)
    
    return [...CpNeeded, fase];
}