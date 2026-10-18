import type { ApiResponse } from "~/configs/appscript-config";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";
import type { ImportKategoriAssesmenSkorKdRepositoryInterface } from "./import-kategori-assesmen-skor-kd-repo-interface";
import type { ParameterServiceSkorKdImport } from "~/controllers/assesmen-penilaian/modals/import-skor-kd/ParameterServiceSkorKdImport";

export interface ImportKategoriAssesmenSkorKdServiceInterface{
    repo:ImportKategoriAssesmenSkorKdRepositoryInterface
    update(param:Record<string, any>):Promise<ApiResponse<ValidatedResponseSiswa>>
    create(param:Record<string, any>):Promise<ApiResponse<ValidatedResponseSiswa>>
}