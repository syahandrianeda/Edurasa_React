import type { ApiResponse} from "~/configs/appscript-config"
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type"

export interface TendikPangkatGolonganRepositoryInterface{
    
        update(param:Record<string,any>):Promise<ApiResponse<PangkatGolonganSheetType>>
        create(param:Record<string,any>):Promise<ApiResponse<PangkatGolonganSheetType>>
}