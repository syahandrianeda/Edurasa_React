import type { ApiResponse } from "~/configs/appscript-config";
import type EnsureLoadedApiRepositoryInterface from "./ensure-loaded-api-repository";

export default interface EnsureLoadedApiServiceInterface<T=any>{
    repo:EnsureLoadedApiRepositoryInterface
    callNeeded(param:Record<string,any>): Promise<ApiResponse<T>>
    update(param:Record<string,any>): Promise<ApiResponse<T>>
    create(param:Record<string,any>): Promise<ApiResponse<T>>
}