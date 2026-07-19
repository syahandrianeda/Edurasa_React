import { namaTab } from "~/lib/nama-tab-environment";
import { sheetAkun_dataSiswa } from "../../by-sheet/akun";
import { sheetKaldik_kalender } from "../../by-sheet/kaldik";

export const defineAbsenRombelNeeded = (rombel?:string)=>[
        sheetAkun_dataSiswa,
        sheetKaldik_kalender,
        {sheet: 'absensi', tab:`${namaTab('kelas')}_${rombel}`}
]