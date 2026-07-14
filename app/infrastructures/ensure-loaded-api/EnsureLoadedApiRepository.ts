import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type EnsureLoadedApiRepositoryInterface from "~/domain/interfaces/ensure-loaded-api-repository";


export default class EnsureLoadedApiRepository extends AppScriptSheet implements EnsureLoadedApiRepositoryInterface
    {
    
    constructor(){
        super()
    }

    
    
    async callNeeded(param: Record<string, any>): Promise<ApiResponse<Record<string, any>>[]> {
        const response =  await this.postBody(param);
        
        return response.collections.map(this.responActionRead);
    }

    
    async update(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.postBody(param);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.postBody(param);
    }
}