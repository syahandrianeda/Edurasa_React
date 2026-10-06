import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { ResponNilaiSiswaRepositoryInterface } from "~/domain/interfaces/respon-nilai-siswa-repository-interface";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";

export default class ResponNilaiSiswaRepository extends AppScriptSheet implements ResponNilaiSiswaRepositoryInterface{
    constructor(){
        super()
    }

    async update(param: Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>> {
        try{
            const addParameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action: 'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    lintas_mapel:'number',
                    start_time:'datetime',
                    paket_soal_id:'number',
                    end_time:'datetime'
            }),

        }
            const parameter = this.buildSheetNilaiTabTagihanRespon(param.rombel, addParameter);
            
             
            const respon = await this.postBody(parameter);
            
            return this.responActionRead(respon)

            // return this.postBody(param);
        }catch(er){
            throw er
        }
    }
    async create(param: Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>> {
        try{
            return this.postBody(param);
        }catch(er){
            throw er
        }
    }
}