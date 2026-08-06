import type { ParamFile, ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { SppdRepositoryInterface } from "~/domain/interfaces/sppd-repository-interface";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";

export default class SppdRepository extends AppScriptSheet implements SppdRepositoryInterface{
    constructor(){
        super()
    }
    async uploadFile(param: ParamFile): Promise<ApiResponse<unknown> | { success: boolean; data: any; message: string; source: string; }> {
        return this.postBody(param);
    }

    async findById(param: Record<string, any>): Promise<ApiResponse<SppdSheetType>> {
        const parameter = {
            action: 'read',
            filter: JSON.stringify(param)
        
        }
        this.paramSheetSuratTabSppd = parameter;
        return await this.postBody(this.paramSheetSuratTabSppd);
    }

    async create(param: Record<string, any>): Promise<ApiResponse<SppdSheetType>> {
        return this.postBody(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<SppdSheetType>> {
        this.paramSheetSuratTabSppd = param;
        try{
                const respon = await this.postBody(this.paramSheetSuratTabSppd);
                
                return this.responActionRead(respon);
            }catch(error){
                return this.responActionError(error);
            }
    }
}