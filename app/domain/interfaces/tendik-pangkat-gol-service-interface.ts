import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";
import type { TendikPangkatGolonganRepositoryInterface } from "./tendik-pangkat-gol-repository-interface";
import type { ApiResponse } from "~/configs/appscript-config";

export interface TendikPangkatGolonganServiceInterface{
    repo:TendikPangkatGolonganRepositoryInterface;
    update(param:Record<string,any>):Promise<ApiResponse<PangkatGolonganSheetType>>
    create(param:Record<string,any>):Promise<ApiResponse<PangkatGolonganSheetType>>
}