import type { SiswaType } from "~/types/siswa";
import type KesiswaanRepositoryInterface from "./kesiswaan-repository-interface";
import type { ApiResponse } from "~/configs/appscript-config";


export default interface KesiswaanServiceInterface{
    repo: KesiswaanRepositoryInterface
    loadAllSiswa?():Promise<ApiResponse<SiswaType>|null>
    uploadFile(param:File,options?:Record<string,any>): Promise<any>
    // getAllFromIndexDb(): Promise<User | null>;
    // getSessionSync(): User | null;
    // logout(): void;
}