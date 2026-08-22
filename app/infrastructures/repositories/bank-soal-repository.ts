import type { ParamFile, ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { BankSoalRepositoryInterface } from "~/domain/interfaces/bank-soal-repository-interface";
import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";

export default class BankSoalRepository extends AppScriptSheet implements BankSoalRepositoryInterface{
    constructor(){
        super()
    }
    async uploadFile(param: ParamFile): Promise<ApiResponse<unknown> | { success: boolean; data: any; message: string; source: string; }> {
        return  await this.postBody(this.paramSheetBankSoalTabBankSoal);
        
    }
    async update(param: Record<string, any>): Promise<ApiResponse<BankSoalSheetType>> {
        try{
            this.paramSheetBankSoalTabBankSoal = param
            const respon =  await this.postBody(this.paramSheetBankSoalTabBankSoal);
            return this.responActionRead(respon);
        }catch(er){
            return this.responActionError(er);
        }
    }
    async create(param: Record<string, any>): Promise<ApiResponse<BankSoalSheetType>> {
        try{
            this.paramSheetBankSoalTabBankSoal = param
            const respon =  await this.postBody(this.paramSheetBankSoalTabBankSoal);
            return this.responActionRead(respon);
        }catch(er){
            return this.responActionError(er);
        }
    }
}