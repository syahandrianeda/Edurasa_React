import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { TransaksiSerahTerimaDokumenRepositoryInterface } from "~/domain/interfaces/transaksi-serah-terima-repository-interface";
import type { TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen";

export default class TransaksiSerahTerimaDokumenRepository extends AppScriptSheet implements TransaksiSerahTerimaDokumenRepositoryInterface{
    constructor(){
        super()
    }
    async uploadFileRepo(param: ParamFile): Promise<Record<string, any>> {
        return await this.postBody(param)
    }
    async create(param: Record<string, any>): Promise<ApiResponse<TransaksiSerahTerimaDokumenSheetType>> {
        try{
            this.paramSheetGalleryTabTransaksiSerahTerimaDokumen = param
            const respon =  await this.postBody(this.paramSheetGalleryTabTransaksiSerahTerimaDokumen);
            return this.responActionRead(respon);
        }catch(er){
            return this.responActionError(er);
        }
    }
    async update(param: Record<string, any>): Promise<ApiResponse<TransaksiSerahTerimaDokumenSheetType>> {
        try{
            this.paramSheetGalleryTabTransaksiSerahTerimaDokumen = param
            const respon =  await this.postBody(this.paramSheetGalleryTabTransaksiSerahTerimaDokumen);
            return this.responActionRead(respon);
        }catch(er){
            return this.responActionError(er);
        }
    }
}