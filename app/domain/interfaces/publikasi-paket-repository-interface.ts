import type { ApiResponse } from "~/configs/appscript-config";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";

export interface PublikasiPaketRepositoryInterface {
    update(param:Record<string, any>):Promise<ApiResponse<PublikasiPaketSheetType>>
    create(param:Record<string, any>):Promise<ApiResponse<PublikasiPaketSheetType>>
}