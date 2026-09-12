import type { ParamFile, ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { PaketSoalRepositoryInterface } from "~/domain/interfaces/paket-soal-repository-interface";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";

export default class PaketSoalRepository extends AppScriptSheet implements PaketSoalRepositoryInterface{
    constructor(){
        super()
    }
    
    async uploadFile(param: ParamFile): Promise<ApiResponse<unknown> | { success: boolean; data: any; message: string; source: string; }> {
         
        return await this.postBody(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<PaketSoalSheetType>> {
        // return await this.postBody(param)
        try{
                this.paramSheetBankSoalTabPaketSoal = param
                const respon =  await this.postBody(this.paramSheetBankSoalTabPaketSoal);
                
                return this.responActionRead(respon);
            }catch(er){
                return this.responActionError(er);
            }
    }

    async create(param: Record<string, any>): Promise<ApiResponse<PaketSoalSheetType>> {
         try{
                this.paramSheetBankSoalTabPaketSoal = param
                const respon =  await this.postBody(this.paramSheetBankSoalTabPaketSoal);
                
                return this.responActionRead(respon);
            }catch(er){
                return this.responActionError(er);
            }
    }
}