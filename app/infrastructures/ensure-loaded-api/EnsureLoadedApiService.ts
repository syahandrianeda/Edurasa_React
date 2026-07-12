import type { ApiResponse } from "~/configs/appscript-config";
import type EnsureLoadedApiServiceInterface from "~/domain/interfaces/ensure-loaded-api-service";
import EnsureLoadedApiRepository from "./EnsureLoadedApiRepository";


export default class EnsurLoadedApiService implements EnsureLoadedApiServiceInterface{
    
    constructor(public repo =  new EnsureLoadedApiRepository()){}

    
    async callNeeded(paramSheet: Record<string, any>[]): Promise<ApiResponse<any>[]> {
        const auth = this.repo.dataAuth();
        const param = {
            action:'readMultipleTab',
            source:JSON.stringify(paramSheet),
            auth
        }
        const data =  await this.repo.callNeeded(param);
        console.log('result callNeeded', data);
        return data;
    }

    async create(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.repo.create(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.repo.update(param);
    }
}