import type { UserRepositoryInterface } from "~/domain/interfaces/user-repository-interface";
import UserRepositoryImplement from "../repositories/user-repository-implement";
import type { UserServiceInterface } from "~/domain/interfaces/user-service-interface";
import type { ApiResponse, ApiResponseGet } from "~/configs/appscript-config";
import type { paramGetCredetnialRepository, paramGetCredetnialService, paramUpdateUserRepository, paramUpdateUserService } from "~/domain/interfaces/user-update-param";
import type { AkunSheet, CredentialSheet } from "~/types/akun-sheet";

export default class UserServiceImplements implements UserServiceInterface{
    constructor(private repo: UserRepositoryInterface = new UserRepositoryImplement()){

    }
    async update(param: paramUpdateUserService): Promise<ApiResponse<Record<string, any>>> {
       
        const parameter:paramUpdateUserRepository={
            data:JSON.stringify(param.data),
            action:'updateUser'
        }
        return this.repo.update(parameter);
    }
    async getCredential(param: paramGetCredetnialService): Promise<ApiResponseGet<CredentialSheet>> {
        const parameter: paramGetCredetnialRepository={
            filter:JSON.stringify(param),
            key_return:JSON.stringify(['username', 'password']),
            action:'getItem'
        }
        return this.repo.getCredential(parameter);
    }

}