import type { AuthRepositoryInterface } from "../interfaces/auth-repository-interface";
import AppScriptSheet from "~/configs/appscript-sheet";
import { clearSessionApp, getSessionApp, saveSessionApp } from "~/infrastructures/session-storage/app-session";
import DTOUser from "~/dtos/dto-user";
import  type {UserPtk } from "~/types";
import type { ApiResponse, ApiResponseTunggal } from "~/configs/appscript-config";
import type { AkunSheet } from "~/types/akun-sheet";
import DTOSheetUser from "~/dtos/akun-from-sheet";


export default class AuthRepository extends AppScriptSheet implements AuthRepositoryInterface {
    constructor() {
        super();
    }
    
    async login(username: string, password: string) {
            let param: Record<string, any> = {
                'action':'login',
                'username':username,
                'password':password,
            };
        this.paramSheetAkunTabUser =param;
        const data = await this.postBody(this.paramSheetAkunTabUser);
        
        
        
        return this.responLoginSuccess(data);
    }
    responLoginSuccess(respon:Record<string, any>):ApiResponse<AkunSheet>{
        return {
            success: respon.success,
            data: respon.success?DTOSheetUser.fromResponAkun(respon.data):undefined,
            error:!(respon.success)?({
                code:'ERROR',
                message: 'Username / Password salah. Silakan perbaiki!',
                details: respon.data
            }):undefined,
            message:respon.success?'Login Berhasil':'Login Gagal, lihat detail di error'
        }
    }
    async getSession() {
        // const session = localStorage.getItem("session");
        // return session ? JSON.parse(session) : null;
        return getSessionApp<UserPtk|null>();
    }
    getSessionSync() {
        // const session = localStorage.getItem("session");
        // return session ? JSON.parse(session) : null;
        return getSessionApp<UserPtk|null>();
    }
    clearSession() {
        // localStorage.removeItem("session");
        clearSessionApp();
    }
}
