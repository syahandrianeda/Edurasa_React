import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { sheetKurikulum_faseA, sheetKurikulum_faseB, sheetKurikulum_faseC } from "../../by-sheet/kurikulum";

export function defineDataSheetNeedFase(rombel:string):DataSheetNeeeded{
    const abjadFase = getFaseByRombel(rombel);
    
    switch(abjadFase){
        case 'A':
            return sheetKurikulum_faseA;
        case 'B':
            return sheetKurikulum_faseB;
        case 'C':
            return sheetKurikulum_faseC;
        default:
            return sheetKurikulum_faseA;
        
    }
}