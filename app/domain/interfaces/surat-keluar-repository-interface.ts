import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type"

export interface SuratKeluarRepositoryInterface{
        uploadFileRepo(param:ParamFile):Promise<Record<string, any>>
        // uploadFile(param:ParamFile):Promise<Record<string, any>>
        create(param:Record<string,any>): Promise<ApiResponse<SuratKeluarSheetType>>
        update(param:Record<string,any>): Promise<ApiResponse<SuratKeluarSheetType>>
}