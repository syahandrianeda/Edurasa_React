import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { sheetKurikulum_jpMapel, sheetKurikulum_mapel } from "../../by-sheet/kurikulum";
import { sheetAkun_dataSiswa } from "../../by-sheet/akun";

export const mapelNeeded:DataSheetNeeeded[]=[
    sheetAkun_dataSiswa, 
    sheetKurikulum_mapel, 
    sheetKurikulum_jpMapel
]


/**--------------
 * @deprecated settingMapel tidak butuh parameter rombel, datanya cuman dalam satu sheet, 
 * gunakan variabel `mapelNeeded' (bukan function)*/
export const defineSettingMapel = (rombel:string):DataSheetNeeeded[]=>{
    // const kurikulum = defineCpTpAtpNeeded(rombel);
    
    return [
        // ...kurikulum, //tidak butuh kurikulum
        sheetAkun_dataSiswa,
        sheetKurikulum_mapel, 
        sheetKurikulum_jpMapel
    ];
}