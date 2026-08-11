import type { TendikPangkatGolonganRepositoryInterface } from "~/domain/interfaces/tendik-pangkat-gol-repository-interface";
import type { TendikPangkatGolonganServiceInterface } from "~/domain/interfaces/tendik-pangkat-gol-service-interface";
import PangkatGolonganRepository from "../repositories/PangkatGolonganRepository";
import type { ApiResponse } from "~/configs/appscript-config";
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";

export default class PangkatGolonganService implements TendikPangkatGolonganServiceInterface{
    constructor(public repo:TendikPangkatGolonganRepositoryInterface = new PangkatGolonganRepository()){}
    
    async create(param: Record<string, any>): Promise<ApiResponse<PangkatGolonganSheetType>> {
        return await this.repo.create(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<PangkatGolonganSheetType>> {
        const data = Array.isArray(param)?param:[param];
        const parameter = {
            data: JSON.stringify(data),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                user_id:'number',
                start_at:'date',
                end_at:'date',
                daftar_pangkat_id: 'number'
            }),
            action:'upsert'
        }
        return await this.repo.update(parameter);
    }

}