import type { ApiResponse } from "~/configs/appscript-config";
import type { KaldikRepositoryInterface } from "~/domain/interfaces/kaldik-repository-interface";
import type { KaldikServiceInterface } from "~/domain/interfaces/kaldik-service-interface";
import type { KaldikSheetType, KaldikType } from "~/types/kaldik";
import KaldikRepositoryImplements from "../repositories/kaldik-repository";
import type { ParamUpsert } from "~/configs/appscript-sheet";

export default class KaldikServiceImplements implements KaldikServiceInterface{
    repo: KaldikRepositoryInterface
    constructor(){
        this.repo = new KaldikRepositoryImplements();
    }
    
    async loadAllKaldik(): Promise<ApiResponse<KaldikType> > {
        
        const data = await this.repo.loadAllKaldik();
            
        return data;
    }
    
    async create(param:Record<string,any>): Promise<ApiResponse<KaldikType>> {
        
        return await this.repo.create(param);
    }
    async update(param:Partial<ParamUpsert<KaldikSheetType>>): Promise<ApiResponse<KaldikType>>{

        return await this.repo.update(param);
    }
}