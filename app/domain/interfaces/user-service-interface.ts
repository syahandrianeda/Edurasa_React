import type { ApiResponse, ApiResponseGet } from "~/configs/appscript-config"
import type { paramGetCredetnialService, paramUpdateUserService } from "./user-update-param"
import type { AkunSheet, CredentialSheet } from "~/types/akun-sheet"


export interface UserServiceInterface{
    update(param:paramUpdateUserService):Promise<ApiResponse<Record<string, any>>>
    getCredential(param:paramGetCredetnialService):Promise<ApiResponseGet<CredentialSheet>>
    
}