import type { ApiResponse } from "~/configs/appscript-config";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";

export interface ImportKategoriAssesmenSkorKdRepositoryInterface{
    createIdssJenjang(jenjang:number):string
    update(param:Record<string, any>):Promise<ApiResponse<ValidatedResponseSiswa>>
    create(param:Record<string, any>):Promise<ApiResponse<ValidatedResponseSiswa>>
}