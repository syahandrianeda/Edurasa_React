import type { ParamFile, ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { SuratMasukRepositoryInterface } from "~/domain/interfaces/surat-masuk-repository-interface";
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type";


export default class SuratMasukRepository extends AppScriptSheet implements SuratMasukRepositoryInterface{
    constructor(){
        super()
    }
    
    async uploadFileRepo(param:ParamFile): Promise<ApiResponse<unknown> | { success: boolean; data: any; message: string; source: string; }> {
        return await this.uploadFile(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<SuratMasukSheetType>> {
        /** tentukan idss dan tab-nya dulu */
        this.paramSheetSuratTabSuratMasuk = param;
        const parameter = this.paramSheetSuratTabSuratMasuk
        
        try{
                const respon = await this.postBody(parameter);
                
                return this.responActionRead(respon);
            }catch(error){
                return this.responActionError(error);
            }
    }

    async create(param: Record<string, any>): Promise<ApiResponse<SuratMasukSheetType>> {
        this.paramSheetSuratTabSuratMasuk = param;
        const parameter = this.paramSheetSuratTabSuratMasuk
        
        try{
                const respon = await this.postBody(parameter);
                
                return this.responActionRead(respon);
            }catch(error){
                return this.responActionError(error);
            }
    }
}