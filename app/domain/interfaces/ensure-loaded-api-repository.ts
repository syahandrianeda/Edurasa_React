import type { ApiResponse } from "~/configs/appscript-config";

export default interface EnsureLoadedApiRepositoryInterface{
    // stateRedux: Store<RootState>
    callNeeded(param:Record<string,any>): Promise<ApiResponse<Record<string, any>>[]>
    update(param:Record<string,any>): Promise<ApiResponse<Record<string, any>>>
    create(param:Record<string,any>): Promise<ApiResponse<Record<string, any>>>
}