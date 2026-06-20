import type { ApiResponse } from "~/configs/appscript-config";
import type { JadwalMapelRepoInterface } from "~/domain/interfaces/sebaran-jadwal-repo-interface";
import type { JadwalMapelServiceInterface } from "~/domain/interfaces/sebaran-jadwal-service-interface";
import type { jadwalMapelAccordTable } from "~/types/setting_jadwal/jadwal_mapel";
import JadwalMapelRepoImplements from "../repositories/jadwal-mapel-repo";

export default class JadwalMapelServiceImplements implements JadwalMapelServiceInterface {
    private repo: JadwalMapelRepoInterface;
    constructor(){
        this.repo = new JadwalMapelRepoImplements();
    }
    async update(param: Record<string, any>): Promise<ApiResponse<jadwalMapelAccordTable>> {
        const paramUpdate = {
            data: JSON.stringify(param),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                sn:'number',
                sl:'number',
                rb:'number',
                km:'number',
                jm:'number',
                sb:'number'
                // kelase:'string'
            }),
            action:'upsert'
        }
        
        return await this.repo.update(paramUpdate)
    }
    async create(param: Record<string, any>): Promise<ApiResponse<jadwalMapelAccordTable>> {
        return this.repo.create(param)
    }
}