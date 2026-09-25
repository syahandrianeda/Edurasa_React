import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type ElemenCpRepositoryInterface from "~/domain/interfaces/elemencp-repository-interface";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";

export default class ElemenCpRepository extends AppScriptSheet implements ElemenCpRepositoryInterface{
    constructor(){
        super();
    }
    async loadAllNeed(): Promise<ApiResponse<Record<string, any>>[]> {
        const paramSheet = this.getParamKurikulumNeeded();
        const auth = this.dataAuth();
        const param = {
            action:'readMultipleTab',
            source:JSON.stringify(paramSheet),
            auth
        }
        const response =  await this.postBody(param);
        return response.map(this.responActionRead);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<ElemenCpType>> {
        return await this.postBody(param);
    }
    async update(param: Record<string, any>): Promise<ApiResponse<ElemenCpType>> {
        try{
            const respon = await this.postBody(param);
            return this.responActionRead(respon);
        }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
        
    }
}