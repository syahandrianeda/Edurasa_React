import type { SerahTerimaRepositoryInterface } from "~/domain/interfaces/serah-terima-repository-interface";
import type { SerahTerimaServiceInterface } from "~/domain/interfaces/serah-terima-service-interface";
import SerahTerimaDokumenRepository from "../repositories/serah-terima-dokumen-repository";
import type { ApiResponse } from "~/configs/appscript-config";
import type { SerahTerimaDokumenSheetType } from "~/types/galleries/serah-terima-dokumen-sheet-type";

export default class SerahTerimaDokumenService implements SerahTerimaServiceInterface{
    constructor(public repo:SerahTerimaRepositoryInterface = new SerahTerimaDokumenRepository()){

    }

    async update(param: Record<string, any>): Promise<ApiResponse<SerahTerimaDokumenSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    start_date: 'datetime',
                    end_date: 'date',
            }),

        }
        return await this.repo.update(parameter);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<SerahTerimaDokumenSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    start_date: 'date',
                    end_date: 'date',
            }),

        }
        return await this.repo.update(parameter);
    }
}