import type { ApiResponse, ApiResponseGet } from "~/configs/appscript-config";
import type { AkunSheet, CredentialSheet } from "~/types/akun-sheet";
import type { paramGetCredetnialRepository, paramGetCredetnialService, paramUpdateUserRepository, paramUpdateUserService } from "./user-update-param";


export interface UserRepositoryInterface{
    update(param:paramUpdateUserRepository):Promise<ApiResponse<Record<string, any>>>
    getCredential(param:paramGetCredetnialRepository):Promise<ApiResponseGet<CredentialSheet>>
    
}