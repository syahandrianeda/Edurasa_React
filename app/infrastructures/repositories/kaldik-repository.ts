import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { KaldikRepositoryInterface } from "~/domain/interfaces/kaldik-repository-interface";
import type { KaldikType } from "~/types/kaldik";

export default class KaldikRepositoryImplements extends AppScriptSheet implements KaldikRepositoryInterface{
    
    constructor(){
        super()
    }
    async loadAllKaldik() : Promise<ApiResponse<KaldikType>>{
        this.paramSheetKaldikTabKaldik = {
            action: 'read'
        }
        const callData = await this.postBody(this.paramSheetKaldikTabKaldik);
        
        return this.responActionRead(callData);
    }
    
    async update(param:Record<string,any>): Promise<ApiResponse<KaldikType>>{
            try{
                const parameter = {
                    ...param,
                    action: 'upsert'
                }
                this.paramSheetKaldikTabKaldik = parameter;
                
                const respon =  await this.postBody(this.paramSheetKaldikTabKaldik);
                
    
                return this.responActionRead(respon);
    
            }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
        }
    async create(param:Record<string,any>): Promise<ApiResponse<KaldikType>>{
            try{
                const parameter = {
                    ...param,
                    action: 'create'
                }
                this.paramSheetKaldikTabKaldik = parameter;
                
                const respon =  await this.postBody(this.paramSheetKaldikTabKaldik);

    
                return this.responActionRead(respon);
    
            }catch(error){
                return this.responActionError(error);
            }
        }
    

}