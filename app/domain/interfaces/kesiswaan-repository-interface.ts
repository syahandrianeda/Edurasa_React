import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { SiswaType } from "~/types/siswa";

export default interface KesiswaanRepositoryInterface{
    loadAllSiswa():Promise<ApiResponse<SiswaType>|null>,
    uploadFileRepo(param:ParamFile):Promise<Record<string, any>>
}