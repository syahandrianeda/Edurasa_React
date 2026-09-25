import type { ParamFile, ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { SerahTerimaRepositoryInterface } from "~/domain/interfaces/serah-terima-repository-interface";
import type { SerahTerimaDokumenSheetType } from "~/types/galleries/serah-terima-dokumen-sheet-type";

export default class SerahTerimaDokumenRepository extends AppScriptSheet implements SerahTerimaRepositoryInterface{
    constructor(){
        super()
    }
    async uploadFileRepo(param: ParamFile): Promise<Record<string, any>> {
        return await this.postBody(param);
    }
    async update(param: Record<string, any>): Promise<ApiResponse<SerahTerimaDokumenSheetType>> {
        this.paramSheetGalleryTabSerahTerimaDokumen = param;
        try{
            const response = await this.postBody(this.paramSheetGalleryTabSerahTerimaDokumen);
            return this.responActionRead(response)
      }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
        
        
    }

    async create(param: Record<string, any>): Promise<ApiResponse<SerahTerimaDokumenSheetType>> {
        return await this.postBody(param);
    }
}