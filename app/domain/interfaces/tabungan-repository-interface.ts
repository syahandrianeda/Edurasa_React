import type { ApiResponse } from "~/configs/appscript-config";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";

export interface TabunganRepositoryInterface{
    update:(param:Record<string, any>)=>Promise<ApiResponse<TabunganSheetType>>
}