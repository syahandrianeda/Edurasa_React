import type { ApiResponse } from "~/configs/appscript-config"
import AppScriptSheet from "~/configs/appscript-sheet"
import type { JadwalMapelRepoInterface } from "~/domain/interfaces/sebaran-jadwal-repo-interface"
import type { jadwalMapelAccordTable } from "~/types/setting_jadwal/jadwal_mapel"

export default class JadwalMapelRepoImplements extends AppScriptSheet implements JadwalMapelRepoInterface {
    constructor(){
        super()
    }
    async update(param: Record<string, any>): Promise<ApiResponse<jadwalMapelAccordTable>> {
        
        try{
            this.paramKurikulumJadwalMapel = param;
            const respon = await this.postBody(this.paramKurikulumJadwalMapel);
            return this.responActionRead(respon);
        }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
    }
    create(param: Record<string, any>): Promise<ApiResponse<jadwalMapelAccordTable>> {
        return this.create(param)
    }   
}