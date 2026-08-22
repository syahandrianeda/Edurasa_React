import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type"
import type { BankSoalRepositoryInterface } from "./bank-soal-repository-interface"

export interface BankSoalServiceInterface{
    repo:BankSoalRepositoryInterface
    uploadFile(param:File,options?:Record<string,any>): Promise<any>
    create(param:Record<string,any>): Promise<ApiResponse<BankSoalSheetType>> 
    update(param:Record<string,any>): Promise<ApiResponse<BankSoalSheetType>>
    
}