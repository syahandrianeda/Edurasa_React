import type { PublikasiPaketRepositoryInterface } from "~/domain/interfaces/publikasi-paket-repository-interface";
import PublikasiPaketRepository from "../repositories/publikasi-paket-repository";
import type { PublikasiPaketServiceInterface } from "~/domain/interfaces/publikasi-paket-service-interface";
import type { ApiResponse } from "~/configs/appscript-config";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";

export default class PubliksiPaketSoalService implements PublikasiPaketServiceInterface{
    constructor(public repo:PublikasiPaketRepositoryInterface = new PublikasiPaketRepository()){};

    async update(param: Record<string, any>): Promise<ApiResponse<PublikasiPaketSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action: 'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    lintas_mapel:'number',
                    start_time:'datetime',
                    end_time:'datetime'
            }),

        }
        return await this.repo.update(parameter)
    }

    async create(param: Record<string, any>): Promise<ApiResponse<PublikasiPaketSheetType>>{
        return this.repo.create(param)
    }
}