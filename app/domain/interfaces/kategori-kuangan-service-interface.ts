import type { ApiResponse } from "~/configs/appscript-config";
import type { KategoriKeuanganSheetType } from "~/types/tabungan/kategori-keuangan-type";
import type { KategoriKeuanganRepositoryInterface } from "./kategori-keuangan-repository-interface";

export interface KategoriKeuanganServiceInterface{
    repo:KategoriKeuanganRepositoryInterface
    update:(param:Record<string, any>)=>Promise<ApiResponse<KategoriKeuanganSheetType>>
}