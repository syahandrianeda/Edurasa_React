import type { ApiResponse } from "~/configs/appscript-config"
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type"

export interface ResponNilaiSiswaRepositoryInterface{
    update(param: Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>>
    create(param: Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>>
}