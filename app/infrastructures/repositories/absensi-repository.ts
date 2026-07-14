import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import AppScriptSheet, { type ParamUpsert } from "~/configs/appscript-sheet";
import type { AbsensiRepositoryInterface } from "~/domain/interfaces/absensi-repository-interface";
import type { AbsensiSiswaSheetType, AbsensiSiswaType } from "~/types/absensi-siswa";

export default class AbsensiRepositoryImplements extends AppScriptSheet implements AbsensiRepositoryInterface{
    constructor(){
        super(); 
    }
    /**@deprecated */
    async loadAbsensiAndKaldik(): Promise<ApiResponse<Record<string, any>>[]> {
        const pushing = [this.paramSheetAbsensiJenjang,this.paramSheetKaldikTabKaldik];
        const auth = this.dataAuth();
        const paramCallKaldikAndAbsensi = {
                action: 'readMultipleTab',
                source: JSON.stringify(pushing),
                auth
            };
        const action =  await this.postBody(paramCallKaldikAndAbsensi);
        console.log('action absen', action);
        return action.collections.map(this.responActionRead);
    }
    /**@deprecated */
    async refreshAbsensi(): Promise<ApiResponse<Record<string, any>>> {
        
        const action = await this.postBody(this.paramSheetAbsensiJenjang);
        console.log('action absen repfes', action);
        return this.responActionRead(action);
    }
    async uploadFileRepo(param: ParamFile): Promise<any> {
            
            return await this.uploadFile(param)
        }
    async create(param: Record<string, any>): Promise<ApiResponse<AbsensiSiswaSheetType>> {
        const action = await this.postBody(this.paramSheetAkunTabSiswa);
        return this.responActionRead(action);
    }
    async update(param: Partial<ParamUpsert<AbsensiSiswaType>>): Promise<ApiResponse<AbsensiSiswaSheetType>> {
        const action = await this.postBody(this.paramSheetAbsensiJenjang);
        return this.responActionRead(action);
    }
    
}