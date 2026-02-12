import type { SiswaType } from "~/types/siswa";
import type KesiswaanRepositoryInterface from "./kesiswaan-repository-interface";
import type { ApiResponse } from "~/configs/appscript-config";


export default interface KesiswaanServiceInterface{
    repo: KesiswaanRepositoryInterface
    loadAllSiswa?():Promise<ApiResponse<SiswaType>|null>
    loadAllSiswaAPI?():Promise<ApiResponse<SiswaType>|null>
    uploadFile(param:File,options?:Record<string,any>): Promise<any>|undefined
    update(param:Record<string,any>): Promise<ApiResponse<SiswaType>>
    create(param:Record<string,any>): Promise<ApiResponse<SiswaType>>
}