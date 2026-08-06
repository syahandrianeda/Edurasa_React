import type { ApiResponse } from "~/configs/appscript-config";
import type { ParamUpsert } from "~/configs/appscript-sheet";
import type MapelRombelServiceInterface from "~/domain/interfaces/mapelrombel-service-interface";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";
import MapelRombelRepositoryImplements from "../repositories/mapelrombel-repository";

export default class MapelRombelServiceImplements implements MapelRombelServiceInterface{
    constructor(public repo = new MapelRombelRepositoryImplements() ){}
    loadAllKurmer(): Promise<ApiResponse<Record<string, any>>[]> {
        return this.repo.loadAllNeed()
    }
    create(param: Partial<ParamUpsert<jp_mapelSheet>>): Promise<ApiResponse<jp_mapelSheet>> {
        return this.repo.create(param)
    }
    async update(param: Partial<ParamUpsert<jp_mapelSheet>>): Promise<ApiResponse<jp_mapelSheet>> {
        
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
        this.repo.paramKurikulumJpMapel = paramUpdate;
        
        return this.repo.update(this.repo.paramKurikulumJpMapel)
    }
}