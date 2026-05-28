import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type SettingJadwalRepositoryInterface from "~/domain/interfaces/setting-jadwal-repository-interface";
import type { settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal";

export default class SettingJadwalRepository extends AppScriptSheet implements SettingJadwalRepositoryInterface{
    constructor(){
            super();
        }
    async create(param: Record<string, any>): Promise<ApiResponse<settingJadwalSheet>> {
        try{
            
            this.paramKurikulumSettingJadwalMapel = param;
            const respon = await this.postBody(param);
            console.log('respon on repo', respon)
            return this.responActionRead(respon);
        }catch(error){
            return this.responActionError(error);
        }  
    }
    async update(param: Record<string, any>): Promise<ApiResponse<settingJadwalSheet>> {
        try{
            this.paramKurikulumSettingJadwalMapel = param;
            const respon = await this.postBody(this.paramKurikulumSettingJadwalMapel);
            console.log('respon on repo', respon)
            return this.responActionRead(respon);
        }catch(error){
            return this.responActionError(error);
        }  
    }   
} 