import type { ApiResponse } from "~/configs/appscript-config"
import type { SuratMasukRepositoryInterface } from "./surat-masuk-repository-interface"
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type"

export interface SuratMasukServiceInterface{
    repo: SuratMasukRepositoryInterface,
            
    uploadFile(param:File,options?:Record<string,any>): Promise<any>
    create(param:Record<string,any>): Promise<ApiResponse<SuratMasukSheetType>>
    update(param:Record<string,any>): Promise<ApiResponse<SuratMasukSheetType>>
}