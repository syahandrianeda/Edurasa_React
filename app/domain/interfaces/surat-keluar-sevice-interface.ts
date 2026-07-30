import type { ApiResponse } from "~/configs/appscript-config"
import type { SuratKeluarRepositoryInterface } from "./surat-keluar-repository-interface"
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type"

export interface SuratKeluarServiceInterface{
        repo: SuratKeluarRepositoryInterface,
        
        uploadFile(param:File,options?:Record<string,any>): Promise<any>
        create(param:Record<string,any>): Promise<ApiResponse<SuratKeluarSheetType>>
        update(param:Record<string,any>): Promise<ApiResponse<SuratKeluarSheetType>>
}