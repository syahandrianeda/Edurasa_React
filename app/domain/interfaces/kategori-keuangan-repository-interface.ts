import type { ApiResponse } from "~/configs/appscript-config";
import type { KategoriKeuanganSheetType } from "~/types/tabungan/kategori-keuangan-type";

export interface KategoriKeuanganRepositoryInterface{
    
    update:(param:Record<string, any>)=>Promise<ApiResponse<KategoriKeuanganSheetType>>
}