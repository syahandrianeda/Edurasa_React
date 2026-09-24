import AuthRepository from "~/infrastructures/repositories/auth-repository"
import type { AuthRepositoryInterface } from "~/domain/interfaces/auth-repository-interface";
import type AuthServiceInterface from "~/domain/interfaces/auth-service-interface";
import DTOUser from "~/dtos/dto-user";
import { clearSessionApp, saveSessionApp } from "../session-storage/app-session";
import type AuthSiswaServiceInterface from "~/domain/interfaces/auth-siswa-service-interface";
import type { AuthSiswaRepositoryInterface } from "~/domain/interfaces/auth-siswa-repository-interface";
import AuthSiswaRepository from "../repositories/auth-siswa-repository";
import DTOUserSiswa from "~/dtos/dto-user-siswa";


export default class AuthSiswaServiceImplements implements AuthSiswaServiceInterface{
    repo: AuthSiswaRepositoryInterface
    constructor() {
        this.repo = new AuthSiswaRepository()
    }

    async login(token:string, type:string) {
        const user = await this.repo.login(token, type);
        console.log('repository',{user})
        if (user.success && user.data) {
            const currentData = DTOUserSiswa.fromResponAkun(user.data);
            console.log(currentData)
            saveSessionApp(currentData);
        } else {
            clearSessionApp();
        }  
        return user 
    }

    async getSession() {
        return this.repo.getSession();
    }
    
    getSessionSync() {
            return this.repo.getSessionSync();
        }

    logout() {
        this.repo.clearSession();
    }
}