import type { ApiResponse } from "~/configs/appscript-config";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";
import type { TabunganRepositoryInterface } from "./tabungan-repository-interface";

export interface TabunganServiceInterface{
    repo:TabunganRepositoryInterface
    update:(param:Record<string, any>)=>Promise<ApiResponse<TabunganSheetType>>
    
}