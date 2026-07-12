import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { defineCpTpAtpNeeded } from "./cp-needed";
import { sheetKurikulum_prota } from "../../by-sheet/kurikulum";

export function defineProtaNeeded(rombel:string):DataSheetNeeeded[]{
    const kurikulum = defineCpTpAtpNeeded(rombel)

    return [...kurikulum, sheetKurikulum_prota]
}