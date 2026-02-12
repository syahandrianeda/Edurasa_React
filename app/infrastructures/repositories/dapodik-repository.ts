import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet, { type ParamUpdateRecord, type ParamUpsert } from "~/configs/appscript-sheet";
import type DapodikRepositoryInterface from "~/domain/interfaces/dapodik-repository-interface";
import type { SiswaDapodikAppToSheet, SiswaDapodikSheetToApp } from "~/types/siswa-dapodik";

export default class DapodikRepositoryImplement extends AppScriptSheet implements DapodikRepositoryInterface{
    constructor(){
        super();
    }
    async loadAllDapodik(): Promise<ApiResponse<SiswaDapodikSheetToApp>> {
        this.paramSheetAkunTabDapodik = {
                action:'read'
            }
        const data = await this.postBody(this.paramSheetAkunTabDapodik);
        return this.responActionRead(data);
    }
    async saveAllDapodik(param: Record<string,any>): Promise<ApiResponse<SiswaDapodikSheetToApp> |null> {
        try{
            this.paramSheetAkunTabDapodik = {
                ...param,
                action:'updateDapodik'
            }
            
            const data = await this.postBody( this.paramSheetAkunTabDapodik);
            
            return this.responActionRead(data);
        }catch(error){
            return this.responActionError(error);
        
        }
    }
}