import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type EnsureLoadedApiRepositoryInterface from "~/domain/interfaces/ensure-loaded-api-repository";


export default class EnsureLoadedApiRepository extends AppScriptSheet implements EnsureLoadedApiRepositoryInterface
    {
    
    constructor(){
        super()
    }

    
    
    async callNeeded(param: Record<string, any>): Promise<ApiResponse<Record<string, any>>[]> {
        try{
            const response =  await this.postBody(param);
            
            
            return response.collections?.map(this.responActionRead)
            
        }catch(error){
            console.log(error)
            // return this.responActionError(error);//
            return [this.responActionError(error) as ApiResponse<Record<string, any>>];
            // return error as ApiResponse<Record<string, any>>
            // return [{success:false, error: error}] as ApiResponse<Record<string, any>>[]

        }
    }

    
    async update(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.postBody(param);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.postBody(param);
    }
}