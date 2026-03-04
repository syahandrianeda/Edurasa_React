import type { ApiResponse } from "~/configs/appscript-config";
import type FaseTpServiceInterface from "~/domain/interfaces/fase-tp-service-interface";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import FaseTpRepository from "../repositories/fase-tp-repository";

export default class FaseTpServiceImplements implements FaseTpServiceInterface{
    constructor(public repo = new FaseTpRepository()){}
    async create(param: Record<string, any>): Promise<ApiResponse<FaseKurikulumType>> {
        return await this.repo.create(param);
    }
    async update(param: Record<string, any>): Promise<ApiResponse<FaseKurikulumType>> {
        return await this.repo.update(param);
    }
}