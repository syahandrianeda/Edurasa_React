import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { ImportKategoriAssesmenSkorKdRepositoryInterface } from "~/domain/interfaces/import-kategori-assesmen-skor-kd-repo-interface";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";


export default class ImportKategoriAssesmenSkorKdRepository extends AppScriptSheet implements ImportKategoriAssesmenSkorKdRepositoryInterface{
    constructor(){
        super();
    }
    async update(param: Record<string, any>): Promise<ApiResponse<ValidatedResponseSiswa>> {
        try{
            const respon = await this.postBody(param);
            console.log(respon)
            if(respon.success){
                return this.responActionRead(respon);
            }
            throw new Error(respon?.message ?? 'Service Gagal',{cause:respon})
            
        }catch(er){
             throw er instanceof Error ? er : new Error(String(er))
        }
    }
    createIdssJenjang(jenjang:number):string{
        return this.idssNilai(jenjang);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<ValidatedResponseSiswa>> {
         try{
            const respon = await this.postBody(param);
            return this.responActionRead(respon);
        }catch(er){
             throw er instanceof Error ? er : new Error(String(er))
        }
    }
}