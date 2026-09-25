import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type MapelRombelRepositoryInterface from "~/domain/interfaces/mapelrombel-repository-interface";
import DTOUser from "~/dtos/dto-user";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";
import { clearSessionApp, saveSessionApp } from "../session-storage/app-session";

export default class MapelRombelRepositoryImplements extends AppScriptSheet implements MapelRombelRepositoryInterface{
        constructor(){
            super();
        }
        async loadAllNeed(): Promise<ApiResponse<Record<string, any>>[]> {
            const paramSheet = this.getParamKurikulumNeeded();
            
            const auth = this.dataAuth();
            const param = {
                action:'readMultipleTab',
                source:JSON.stringify(paramSheet),
                auth
            }
            
            const response =  await this.postBody(param);
            
            

            return response.collections.map(this.responActionRead);
        }
        /**
         * 
         * @param param if (user.success) {
                    const currentData = DTOUser.fromResponAkun(user.data);
                    saveSessionApp(currentData);
                } else {
                    clearSessionApp();
                }  
         * @returns 
         */
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
                
                return this.responActionRead(respon);
            }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
            
        }
}