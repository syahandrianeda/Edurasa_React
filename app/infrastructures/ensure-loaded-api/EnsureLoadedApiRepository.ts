import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type EnsureLoadedApiRepositoryInterface from "~/domain/interfaces/ensure-loaded-api-repository";


export default class EnsureLoadedApiRepository extends AppScriptSheet implements EnsureLoadedApiRepositoryInterface
    {
    
    constructor(){
        super()
    }

    
    
    async callNeeded(param: Record<string, any>): Promise<ApiResponse<Record<string, any>>> {
        try{
            const respon = await this.postBody(param);
            console.log('repository sukses',{respon}, respon);
            if(respon.collections){
                return respon.collections.map(this.responActionRead);
            }else{
                throw new Error(respon.message ?? 'respon repository tidak punya collections / success = false',{cause:respon})
            }
        }catch(error){
            console.log('repository gagal',{error})
            // return this.responActionError(error);
            throw new Error('error di repository', {cause:[error]})
        }
        
    }

    
    async update(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.postBody(param);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.postBody(param);
    }
}