import type { ResponNilaiSiswaRepositoryInterface } from "~/domain/interfaces/respon-nilai-siswa-repository-interface";
import type { ResponNilaiSiswaServiceInterface } from "~/domain/interfaces/respon-nilai-siswa-service-interface";
import ResponNilaiSiswaRepository from "../repositories/ResponNilaiSiswaRepository";
import type { ApiResponse } from "~/configs/appscript-config";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";

export default class ResponNilaiSiswwaService implements ResponNilaiSiswaServiceInterface{
    constructor( public repo:ResponNilaiSiswaRepositoryInterface = new ResponNilaiSiswaRepository()){}
    async update(param: Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>> {
        
        
        return this.repo.update(param);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<NilaiSiswaSheetType>> {
        return this.repo.update(param);
    }
}