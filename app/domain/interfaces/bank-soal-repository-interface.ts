import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type"

export interface BankSoalRepositoryInterface{
    uploadFile(param:ParamFile):Promise<Record<string, any>>
    create(param:Record<string,any>): Promise<ApiResponse<BankSoalSheetType>> 
    update(param:Record<string,any>): Promise<ApiResponse<BankSoalSheetType>>
    
}