import type { ApiResponse } from "~/configs/appscript-config";
import type ElemenCpServiceInterface from "~/domain/interfaces/elemencp-service-interface";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import ElemenCpRepository from "../repositories/elemencp-repository";

export default class ElemenCpServiceImplements implements ElemenCpServiceInterface{
    constructor(public repo = new ElemenCpRepository()){}
    async loadAllKurmer(): Promise<ApiResponse<Record<string, any>>[]> {

        return await this.repo.loadAllNeed();
    }
    async create(param: Record<string, any>): Promise<ApiResponse<ElemenCpType>> {
        return await this.repo.create(param);
    }
    async update(param: Record<string, any>): Promise<ApiResponse<ElemenCpType>> {
        this.repo.paramKurikulumCp = {...param, action:'upsert'};
        return await this.repo.update(this.repo.paramKurikulumCp)
    }
}