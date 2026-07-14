import type { ApiResponse, ApiResponseGet } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { UserRepositoryInterface } from "~/domain/interfaces/user-repository-interface";
import type { paramGetCredetnialRepository, paramGetCredetnialService, paramUpdateUserRepository, paramUpdateUserService } from "~/domain/interfaces/user-update-param";
import type { AkunSheet, CredentialSheet } from "~/types/akun-sheet";

export default class UserRepositoryImplement extends AppScriptSheet implements UserRepositoryInterface{
    constructor(){
        super();
    }
    async update(param: paramUpdateUserRepository): Promise<ApiResponse<ApiResponse<Record<string, any>>>> {
        this.paramSheetAkunTabUser = param;
        
        return await this.postBody(this.paramSheetAkunTabUser);
    }

    async getCredential(param: paramGetCredetnialRepository): Promise<ApiResponseGet<CredentialSheet>> {
        this.paramSheetAkunTabUser = param;
        
        const data =  await this.postBody(this.paramSheetAkunTabUser );
        // return this.responActionRead(data)
        return data
    }
}