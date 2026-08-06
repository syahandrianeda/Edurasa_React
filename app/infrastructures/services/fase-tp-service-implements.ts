import type { ApiResponse } from "~/configs/appscript-config";
import type FaseTpServiceInterface from "~/domain/interfaces/fase-tp-service-interface";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import FaseTpRepository from "../repositories/fase-tp-repository";
import DTOFaseTp from "~/dtos/dto-fase-tp";

export default class FaseTpServiceImplements implements FaseTpServiceInterface{
    constructor(public repo = new FaseTpRepository()){}
    async create(param: Record<string, any>): Promise<ApiResponse<FaseKurikulumType>> {
        let paramRepo = {}
        const paramDto = DTOFaseTp.toSheet(param);
        
        const paramUpdate = {
            data: JSON.stringify([paramDto]),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                foreignkey_elemencp:'number',
            })
        }
        if(param.faseName === 'A'){
            this.repo.paramKurikulumTpFaseA = paramUpdate;
            paramRepo = this.repo.paramKurikulumTpFaseA;
        }else if(param.faseName === 'B'){
            this.repo.paramKurikulumTpFaseB = paramUpdate;
            paramRepo = this.repo.paramKurikulumTpFaseB;

        }else if(param.faeName === 'C'){
            this.repo.paramKurikulumTpFaseC = paramUpdate;
            paramRepo = this.repo.paramKurikulumTpFaseC;
        }
        return await this.repo.create(paramRepo);
    }
    async update(param: Record<string, any>): Promise<ApiResponse<FaseKurikulumType>> {
        let paramRepo = {}
        const paramDto = DTOFaseTp.toSheet(param)
       
        const paramUpdate = {
            data: JSON.stringify([paramDto]),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                foreignkey_elemencp:'number',
            }),
            action:'upsert'
        }
        if(param.faseName === 'A'){
            this.repo.paramKurikulumTpFaseA = paramUpdate;
            paramRepo = this.repo.paramKurikulumTpFaseA;
        }else if(param.faseName === 'B'){
            this.repo.paramKurikulumTpFaseB = paramUpdate;
            paramRepo = this.repo.paramKurikulumTpFaseB;
        }else if(param.faseName === 'C'){
            this.repo.paramKurikulumTpFaseC = paramUpdate;
            paramRepo = this.repo.paramKurikulumTpFaseC;
        }

        return await this.repo.update(paramRepo);
    }
}