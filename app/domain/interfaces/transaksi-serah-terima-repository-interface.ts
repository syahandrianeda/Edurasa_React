import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen"

export interface TransaksiSerahTerimaDokumenRepositoryInterface{
        uploadFile(param:ParamFile):Promise<Record<string, any>>
        create(param:Record<string,any>): Promise<ApiResponse<TransaksiSerahTerimaDokumenSheetType>>
        update(param:Record<string,any>): Promise<ApiResponse<TransaksiSerahTerimaDokumenSheetType>>
}