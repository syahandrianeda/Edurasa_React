import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { TendikPangkatGolonganRepositoryInterface } from "~/domain/interfaces/tendik-pangkat-gol-repository-interface";
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";

export default class PangkatGolonganRepository extends AppScriptSheet implements TendikPangkatGolonganRepositoryInterface{
    constructor(){
        super()
    }
    async create(param: Record<string, any>): Promise<ApiResponse<PangkatGolonganSheetType>> {
        try{
            this.paramSheetTendikTabPangkatGolongan = param;
            const response = await this.postBody(this.paramSheetTendikTabPangkatGolongan);
            return this.responActionRead(response)
       }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
    }
    async update(param: Record<string, any>): Promise<ApiResponse<PangkatGolonganSheetType>> {
        try{
            this.paramSheetTendikTabPangkatGolongan = param;
            const response = await this.postBody(this.paramSheetTendikTabPangkatGolongan);
            return this.responActionRead(response)
        }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
    }
}