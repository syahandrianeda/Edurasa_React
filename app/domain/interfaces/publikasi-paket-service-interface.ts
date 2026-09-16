import type { ApiResponse } from "~/configs/appscript-config";
import type { PublikasiPaketRepositoryInterface } from "./publikasi-paket-repository-interface";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";

export interface PublikasiPaketServiceInterface {
    repo:PublikasiPaketRepositoryInterface;
    update(param:Record<string, any>): Promise<ApiResponse<PublikasiPaketSheetType>>
    create(param:Record<string, any>): Promise<ApiResponse<PublikasiPaketSheetType>>
    
}