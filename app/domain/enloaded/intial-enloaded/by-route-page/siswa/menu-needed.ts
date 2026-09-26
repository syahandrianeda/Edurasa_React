import { namaTab } from "~/lib/nama-tab-environment";
import { sheetAkun_dataSiswa } from "../../by-sheet/akun";
import { sheetKaldik_kalender } from "../../by-sheet/kaldik";
import { sheetBankSoal, sheetBankSoal_bankSoal, sheetBankSoal_paketSoal, sheetBankSoal_publikasiPaket, sheetBankSoal_taksonomiBloom } from "../../by-sheet/bank-soal";
import { defineDataSheetNeedFase } from "../kurikulum/fase-needed";
import { CpNeeded } from "../kurikulum/cp-needed";
import { sheetKurikulum_atp, sheetKurikulum_elemenCp, sheetKurikulum_jadwalMapel, sheetKurikulum_jpMapel, sheetKurikulum_kegiatanNonKbm, sheetKurikulum_mapel, sheetKurikulum_prota, sheetKurikulum_settingJadwal } from "../../by-sheet/kurikulum";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type{ UserSiswa } from "~/types/user-siswa";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { getNumberFromString } from "~/lib/get-number";
import { defineNilaiTabTagihanRespon } from "../nilai/nilai-rombel-needed";

export const siswaDefindeAbsenRombelNeeded = (rombel?:string)=>{
        const user = getSessionApp<UserSiswa>();
        const rombelSession = getSessionRombel();
        const user_id = user?.id
        const siswaRombel = user?.rombel ?? rombelSession;
        const jenjang = getNumberFromString(siswaRombel);
        const fase = defineDataSheetNeedFase(rombel ?? siswaRombel);
        const tabNilai = defineNilaiTabTagihanRespon(rombel ?? siswaRombel);
        
        return [
                // ...CpNeeded, 
                {...sheetAkun_dataSiswa, filter: user?.id && JSON.stringify({id: user.id})},
                    sheetKurikulum_mapel,
                    sheetKurikulum_jpMapel,
                    sheetKurikulum_settingJadwal,
                    sheetKurikulum_elemenCp,
                    sheetKurikulum_atp,
                fase,
                tabNilai,
                sheetKurikulum_prota,
                sheetKurikulum_jadwalMapel, 
                sheetKaldik_kalender,
                {...sheetBankSoal_bankSoal, filter:JSON.stringify({'jenjang_khusus':jenjang})},
                sheetBankSoal_taksonomiBloom,
                sheetBankSoal_paketSoal,
                // sheetBankSoal_publikasiPaket,
                sheetKurikulum_kegiatanNonKbm,
                sheetKaldik_kalender,
                
                {...sheetBankSoal_publikasiPaket, exceptFilter:JSON.stringify({"paket_soal_id":0})},
                {sheet: 'absensi', tab:`${namaTab('kelas')}_${rombel}`,filter:JSON.stringify({rombel})},
        ]
}