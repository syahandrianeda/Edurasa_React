import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type MapelRombelRepositoryInterface from "~/domain/interfaces/mapelrombel-repository-interface";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";

export default class MapelRombelRepositoryImplements extends AppScriptSheet implements MapelRombelRepositoryInterface{
     constructor(){
            super();
        }
        async loadAllNeed(): Promise<ApiResponse<Record<string, any>>[]> {
            const paramSheet = this.getParamKurikulumNeeded();
            const param = {
                action:'readMultipleTab',
                source:JSON.stringify(paramSheet)
            }
            const response =  await this.postBody(param);
            return response.map(this.responActionRead);
        }
        // async loadAllNeed(): Promise<ApiResponse<Record<string, any>>[]> {
        //     const paramSheet = this.getParamKurikulumNeeded();
        //     const param = {
        //         action:'readMultipleTab',
        //         source:JSON.stringify(paramSheet)
        //     }
        //     const response =  await this.postBody(param);
        //     return response.map(this.responActionRead);
        // }
        async create(param: Record<string, any>): Promise<ApiResponse<jp_mapelSheet>> {
            return await this.postBody(param);
        }
        async update(param: Record<string, any>): Promise<ApiResponse<jp_mapelSheet>> {
            try{
                const respon = await this.postBody(param);
                console.log('respon on repo', respon)
                return this.responActionRead(respon);
            }catch(error){
                return this.responActionError(error);
            }
            
        }
}