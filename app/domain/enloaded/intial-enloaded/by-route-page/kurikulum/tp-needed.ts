import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { defineDataSheetNeedFase } from "./fase-needed";
import { defineCpNeeded } from "./cp-needed";

export const defineTpNeeded = (rombel:string):DataSheetNeeeded[]=>{
    const cp = defineCpNeeded(rombel);
    
    
    return [...cp];
}