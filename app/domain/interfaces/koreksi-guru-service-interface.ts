import type { ApiResponse } from "~/configs/appscript-config"
import type { KoreksiGuruRepositoryInterface } from "./koreksi-guru-repository-interface"
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type"

export interface KoreksiGuruServiceInterface{
    Repo:KoreksiGuruRepositoryInterface
    update(paramUtama: Record<string, any>, param2:Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>>
    create(paramUtama: Record<string, any>, param2:Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>>
}