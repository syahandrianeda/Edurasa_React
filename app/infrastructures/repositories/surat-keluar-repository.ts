import type { ParamFile, ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { SuratKeluarRepositoryInterface } from "~/domain/interfaces/surat-keluar-repository-interface";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";

export default class SuratKeluarRepository extends AppScriptSheet implements SuratKeluarRepositoryInterface{
    constructor(){
        super()
    }
    
    async uploadFileRepo(param: ParamFile): Promise<ApiResponse<unknown> | { success: boolean; data: any; message: string; source: string; }> {
        return await this.uploadFile(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<SuratKeluarSheetType>> {
        /** tentukan idss dan tab-nya dulu */
        this.paramSheetSuratTabSuratKeluar = param;
        const parameter = this.paramSheetSuratTabSuratKeluar
        
        try{
                const respon = await this.postBody(parameter);
                
                return this.responActionRead(respon);
            }catch(error){
                return this.responActionError(error);
            }
    }

    async create(param: Record<string, any>): Promise<ApiResponse<SuratKeluarSheetType>> {
        this.paramSheetSuratTabSuratKeluar = param;
        const parameter = this.paramSheetSuratTabSuratKeluar
        
        try{
                const respon = await this.postBody(parameter);
                
                return this.responActionRead(respon);
            }catch(error){
                return this.responActionError(error);
            }
    }
}