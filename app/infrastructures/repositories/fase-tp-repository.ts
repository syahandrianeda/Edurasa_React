import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type FaseTpRepositoryInterface from "~/domain/interfaces/fase-tp-repository-interface";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export default class FaseTpRepository extends AppScriptSheet implements FaseTpRepositoryInterface{
    constructor(){
        super();
    }
    async create(param: Record<string, any>): Promise<ApiResponse<FaseKurikulumType>> {
        return this.postBody(param);
    }
    async update(param: Record<string, any>): Promise<ApiResponse<FaseKurikulumType>> {
        return this.postBody(param);
    }
}