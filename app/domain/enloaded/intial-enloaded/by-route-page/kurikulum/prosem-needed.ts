import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { defineProtaNeeded } from "./prota-needed";
import { sheetKurikulum_jadwalMapel, sheetKurikulum_jpMapel, sheetKurikulum_kegiatanNonKbm, sheetKurikulum_prota, sheetKurikulum_settingJadwal } from "../../by-sheet/kurikulum";
import { defineDataSheetNeedFase } from "./fase-needed";
import { CpNeeded } from "./cp-needed";
import { sheetKaldik_kalender } from "../../by-sheet/kaldik";

/**
 * 
 * @param rombel [
    {
        "idss": "1xQUBegolorHnpiHp5iWz-56WE8iUfWburWzHyHNbLBw",
        "tab": "trial_datasiswa"
    },
    {
        "idss": "1iH8YyPHyZNmAJshcpWVLkA30GsyImF0OSM_g9SnRIkQ",
        "tab": "trial_mapel"
    },
    {
        "idss": "1iH8YyPHyZNmAJshcpWVLkA30GsyImF0OSM_g9SnRIkQ",
        "tab": "trial_elemen_cp"
    },
    {
        "idss": "1iH8YyPHyZNmAJshcpWVLkA30GsyImF0OSM_g9SnRIkQ",
        "tab": "trial_Atp"
    },
    {
        "idss": "1iH8YyPHyZNmAJshcpWVLkA30GsyImF0OSM_g9SnRIkQ",
        "tab": "trial_faseB"
    },
    {
        "idss": "1iH8YyPHyZNmAJshcpWVLkA30GsyImF0OSM_g9SnRIkQ",
        "tab": "trial_prota"
    }
]
 * @returns 
 */

export const defineProsemNeeded = (rombel:string):DataSheetNeeeded[] =>{
    // const prota = defineProtaNeeded(rombel);
    const fase = defineDataSheetNeedFase(rombel)
    return [
        ...CpNeeded, 
        fase,
        sheetKurikulum_prota,
        sheetKurikulum_jadwalMapel, 
        sheetKaldik_kalender,
        sheetKurikulum_kegiatanNonKbm,
    ]
}