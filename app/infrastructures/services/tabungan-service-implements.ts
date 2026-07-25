import type { TabunganRepositoryInterface } from "~/domain/interfaces/tabungan-repository-interface";
import type { TabunganServiceInterface } from "~/domain/interfaces/tabungan-service-interface";
import TabunganRepository from "../repositories/tabungan-repository";
import type { ApiResponse } from "~/configs/appscript-config";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";

export default class TabunganServiceImplements implements TabunganServiceInterface{
    
    constructor(readonly repo:TabunganRepositoryInterface = new TabunganRepository()){}
    
    async update(param: Record<string, any>):Promise<ApiResponse<TabunganSheetType>>{
        /**
         * const paramUpdate = {
            data: JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                foreignkey_elemencp:'number',
                //idbaris	foreignkey_elemencp	
                foreignkey_tp:'number',
                kelas:'string'
            }),
            action:'upsert'
        }
         */
        const {data, tab} = param;
        const parameter = {
            data:JSON.stringify([data]),
            tab,
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                time_stamp: 'datetime',
                siswa_id: 'number',
                // nama_siswa: string,
                masuk: 'number',
                keluar: 'number',
                
            }),
            action:'upsert'
        }
        return await this.repo.update(parameter)
    };
}