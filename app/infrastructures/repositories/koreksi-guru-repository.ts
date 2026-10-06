import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { KoreksiGuruRepositoryInterface } from "~/domain/interfaces/koreksi-guru-repository-interface";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";

export default class KoreksiGuruRepository extends AppScriptSheet implements KoreksiGuruRepositoryInterface{
    constructor(){
        super();
    }
    repoIdsNilai(jenjang:number):string{
        return this.idssNilai(jenjang)
    }
    async update(param: Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>> {
        try{
            const respon = await this.postBody(param);
            console.log({respon})
             if(respon.collections){
                return respon.collections.map(this.responActionRead);
            }else{
                throw new Error(respon.message ?? 'respon repository tidak punya collections / success = false',{cause:respon})
            }
        }catch(error){
            throw error
        }
    }
    async create(param: Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>> {
        try{
            const respon = await this.postBody(param);
            return this.responActionRead(respon);
        }catch(error){
            throw error
        }
    }
}