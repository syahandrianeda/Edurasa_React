import { namaTab } from "~/lib/nama-tab-environment";
import { sheetAkun_dataSiswa } from "../../by-sheet/akun";
import { sheetKaldik_kalender } from "../../by-sheet/kaldik";
import { sheetBankSoal, sheetBankSoal_publikasiPaket } from "../../by-sheet/bank-soal";

export const siswaDefindeAbsenRombelNeeded = (rombel?:string)=>[
        // sheetAkun_dataSiswa,
        sheetBankSoal_publikasiPaket,
        sheetKaldik_kalender,
        {sheet: 'absensi', tab:`${namaTab('kelas')}_${rombel}`,filter:JSON.stringify({rombel})},
]