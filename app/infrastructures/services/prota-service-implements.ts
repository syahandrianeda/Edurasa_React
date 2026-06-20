import type { ApiResponse } from "~/configs/appscript-config";
import type { ProtaRepositoryInterface } from "~/domain/interfaces/prota-repo-interface";
import type { protaSheet } from "~/types/kurikulum/prota-orm";
import ProtaRepositoryImplements from "../repositories/prota-repo-implementasi";

export default class ProtaServiceImplements{
    constructor(public repo: ProtaRepositoryInterface = new ProtaRepositoryImplements()) {}

    async update(param: Record<string, any>): Promise<ApiResponse<protaSheet>> {
        const paramUpdate = {
            data: JSON.stringify(param),
            key_match: 'idbaris',
            key_index: 'idbaris',
            schema: JSON.stringify({
                idbaris: 'number',
                cp_idbaris: 'number',
                tp_idbaris: 'number',
                atp_idbaris: 'number',
                alokasi_waktu: 'number',
            }),
            action: 'upsert'
        };
        return await this.repo.update(paramUpdate);
    }

    async create(param: Record<string, any>): Promise<ApiResponse<protaSheet>> {
        return await this.repo.create(param);
    }

}