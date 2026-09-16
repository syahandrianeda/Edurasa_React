import type { ApiResponse } from "~/configs/appscript-config"
import type { PaketSoalRepositoryInterface } from "./paket-soal-repository-interface"
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type"

export interface PaketSoalServiceInterface{
    repo:PaketSoalRepositoryInterface
    uploadFile(param:File,options?:Record<string,any>): Promise<any>
    create(param:Record<string,any>): Promise<ApiResponse<PaketSoalSheetType>> 
    update(param:Record<string,any>): Promise<ApiResponse<PaketSoalSheetType>>
    
}