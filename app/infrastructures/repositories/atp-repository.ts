import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet, { type ParamRequestAppScript } from "~/configs/appscript-sheet";
import type AtpRepositoryInterface from "~/domain/interfaces/atp-repository-interface";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";

export default class AtpRepository extends AppScriptSheet implements AtpRepositoryInterface{
    constructor(){
        super();
    }
    async create(param: Record<string, any>): Promise<ApiResponse<AtpKurikulumType>> {
        return await this.postBody(param);
    }
    async update(param: Record<string, any>): Promise<ApiResponse<AtpKurikulumType>> {
        return await this.postBody(param);
    }
}