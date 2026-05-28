import type { ApiResponse } from "~/configs/appscript-config";
import type { settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal";
import SettingJadwalRepository from "../repositories/setting-jadwal-repo";
import type SettingJadwalRepositoryInterface from "~/domain/interfaces/setting-jadwal-repository-interface";
import type SettingJadwalServiceInterface from "~/domain/interfaces/setting-jadwal-service-interface";

export default class SettingJadwalService implements SettingJadwalServiceInterface{
    private repo: SettingJadwalRepositoryInterface

    constructor(){
        this.repo = new SettingJadwalRepository();
    }

    async create(param: Record<string, any>): Promise<ApiResponse<settingJadwalSheet>> {
        const paramUpdate = {
                data: JSON.stringify(param),
                key_match:'idbaris',
                key_index:'idbaris',
                schema:JSON.stringify({
                    idbaris:'number',
                    jp_perminggu:'number',
                    //idbaris	foreignkey_elemencp	
                    index_in_rombel:'number',
                    idmapel:'number',
                    // kelase:'string'
                }),
                action:'upsert'
            }
            const respon = await this.repo.create(param);
            console.log('respon on repo', respon)
            return respon;
    }

    async update(param: Record<string, any>): Promise<ApiResponse<settingJadwalSheet>> {
        const paramUpdate = {
            data: JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                rombel:'string',
                jam_awal:'datetime',
                has_rest_time:'number',
                include_sabtu:'number',
                count_jp_hari:'number',
                interval_menit:'number',
            }),
            action:'upsert'
        }
        const respon = await this.repo.update(paramUpdate);
        return respon;
    }
}