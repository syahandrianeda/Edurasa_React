import type DapodikRepositoryInterface from "~/domain/interfaces/dapodik-repository-interface";
import type DapodikServiceInterface from "~/domain/interfaces/dapodik-service-interface";
import DapodikRepositoryImplement from "../repositories/dapodik-repository";
import type { ApiResponse } from "~/configs/appscript-config";
import type { SiswaDapodikAppToSheet, SiswaDapodikSheetToApp } from "~/types/siswa-dapodik";
import type { ParamUpsert } from "~/configs/appscript-sheet";

export default class DapodikServiceImplements implements DapodikServiceInterface{
    private repo: DapodikRepositoryInterface
    constructor(){
        this.repo = new DapodikRepositoryImplement()
    }
    async loadAllDapodik(): Promise<ApiResponse<SiswaDapodikSheetToApp> | null> {
        
        return await this.repo.loadAllDapodik();
    }
    async saveAllDapodik(param: Partial<ParamUpsert<SiswaDapodikAppToSheet>>): Promise<ApiResponse<SiswaDapodikSheetToApp> | null> {
        const paramUpsertCombine = {
            ...param,
        }
        return await this.repo.saveAllDapodik(paramUpsertCombine);
    }
}