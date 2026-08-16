import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { TransaksiSerahTerimaDokumenRepositoryInterface } from "./transaksi-serah-terima-repository-interface";
import type { TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen";

export interface TransaksiSerahTerimaServiceInterface{
    repo: TransaksiSerahTerimaDokumenRepositoryInterface
    uploadFile(param:File,options?:Record<string,any>): Promise<any>
    create(param:Record<string,any>): Promise<ApiResponse<TransaksiSerahTerimaDokumenSheetType>>
    update(param:Record<string,any>): Promise<ApiResponse<TransaksiSerahTerimaDokumenSheetType>>
}