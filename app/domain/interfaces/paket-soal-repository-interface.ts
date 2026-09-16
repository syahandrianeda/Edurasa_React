import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type"

export interface PaketSoalRepositoryInterface{
    uploadFile(param:ParamFile):Promise<Record<string, any>>
    create(param:Record<string,any>): Promise<ApiResponse<PaketSoalSheetType>> 
    update(param:Record<string,any>): Promise<ApiResponse<PaketSoalSheetType>>
}