import AuthRepository from "~/infrastructures/repositories/auth-repository"
import type { AuthRepositoryInterface } from "~/domain/interfaces/auth-repository-interface";
import type AuthServiceInterface from "~/domain/interfaces/auth-service-interface";
import DTOUser from "~/dtos/dto-user";
import { clearSessionApp, saveSessionApp } from "../session-storage/app-session";


export default class AuthServiceImplements implements AuthServiceInterface{
    repo: AuthRepositoryInterface
    constructor() {
        this.repo = new AuthRepository()
    }

    async login(username: string, password: string) {
        const user = await this.repo.login(username, password);
        
        if (user.success) {
            const currentData = DTOUser.fromResponAkun(user.data);
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