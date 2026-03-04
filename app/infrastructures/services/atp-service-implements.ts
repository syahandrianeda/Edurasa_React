import type { ApiResponse } from "~/configs/appscript-config";
import type AtpServiceInterface from "~/domain/interfaces/atp-service-interface";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import AtpRepository from "../repositories/atp-repository";

export default class AtpServiceImplements implements AtpServiceInterface{
    constructor(public repo = new AtpRepository()){}
    async create(param: Record<string, any>): Promise<ApiResponse<AtpKurikulumType>> {
        return await this.repo.create(param);
    }
    async update(param: Record<string, any>): Promise<ApiResponse<AtpKurikulumType>> {
        return await this.repo.update(param);
    }
}