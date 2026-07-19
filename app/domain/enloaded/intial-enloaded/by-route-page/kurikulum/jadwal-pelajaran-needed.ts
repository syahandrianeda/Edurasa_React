import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { mapelNeeded } from "./mapel-needed";
import { sheetKurikulum_jadwalMapel, sheetKurikulum_kegiatanNonKbm, sheetKurikulum_settingJadwal } from "../../by-sheet/kurikulum";

export const JadwalPelajaranNeeded:DataSheetNeeeded[]=[
    ...mapelNeeded,
    sheetKurikulum_settingJadwal,
    sheetKurikulum_jadwalMapel,
    sheetKurikulum_kegiatanNonKbm
]