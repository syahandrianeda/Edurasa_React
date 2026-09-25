import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { PublikasiPaketRepositoryInterface } from "~/domain/interfaces/publikasi-paket-repository-interface";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";

export default class PublikasiPaketRepository extends AppScriptSheet implements PublikasiPaketRepositoryInterface{
    constructor(){
        super();
    }
    
    async update(param: Record<string, any>): Promise<ApiResponse<PublikasiPaketSheetType>> {
        try{
            this.paramSheetBankSoalTabPublikasiPaket = param;
            const respon = await this.postBody(this.paramSheetBankSoalTabPublikasiPaket);
            
            return this.responActionRead(respon)

        }catch(er){
            // return await this.responActionError(err);
             throw er instanceof Error ? er : new Error(String(er))
        }
    }
    
    async create(param: Record<string, any>): Promise<ApiResponse<PublikasiPaketSheetType>> {
         try{
            this.paramSheetBankSoalTabPublikasiPaket = param;
            
            const respon = this.postBody(this.paramSheetBankSoalTabPublikasiPaket);
            return this.responActionRead(respon);

        }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
    }
}