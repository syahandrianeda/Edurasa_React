import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type"

export interface SuratMasukRepositoryInterface{
    uploadFileRepo(param:ParamFile):Promise<Record<string, any>>
    create(param:Record<string,any>): Promise<ApiResponse<SuratMasukSheetType>>
    update(param:Record<string,any>): Promise<ApiResponse<SuratMasukSheetType>>
}