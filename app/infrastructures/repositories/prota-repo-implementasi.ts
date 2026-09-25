import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { ProtaRepositoryInterface } from "~/domain/interfaces/prota-repo-interface";
import type { protaSheet } from "~/types/kurikulum/prota-orm";

export default class ProtaRepositoryImplements extends AppScriptSheet implements ProtaRepositoryInterface{
    constructor() {
        super();
    }

    async update(param: Record<string, any>): Promise<ApiResponse<protaSheet>> {
        try {
            this.paramSheetMateriTabProta = param
            const respon = await this.postBody(this.paramSheetMateriTabProta);
            
            return this.responActionRead(respon);
        }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
    }

    async create(param: Record<string, any>): Promise<ApiResponse<protaSheet>> {
        try {
            const parameter = {
                ...param,
                action: 'create'
            };
            // this.paramKurikulumProta = parameter;
            const respon = await this.postBody(parameter);
            return this.responActionRead(respon);
       }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
    }

}