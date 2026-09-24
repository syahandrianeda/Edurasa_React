import type { AuthRepositoryInterface } from "../../domain/interfaces/auth-repository-interface";
import AppScriptSheet from "~/configs/appscript-sheet";
import { clearSessionApp, getSessionApp } from "~/infrastructures/session-storage/app-session";
import  type {UserPtk } from "~/types";
import type { ApiResponse} from "~/configs/appscript-config";
import type { AkunSheet } from "~/types/akun-sheet";
import DTOSheetUser from "~/dtos/akun-from-sheet";
import type { AuthSiswaRepositoryInterface } from "~/domain/interfaces/auth-siswa-repository-interface";
import type { AkunSiswaSheet, UserSiswa } from "~/types/user-siswa";
import { ConfigToolbarSelectMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-select.mapel";


export default class AuthSiswaRepository extends AppScriptSheet implements AuthSiswaRepositoryInterface {
    constructor() {
        super();
    }
   
    async login(token: string, typeToken: string): Promise<any | null> {
        // try{
            let param: Record<string, any> = {
                  'action':'loginSiswa',
                  'token':token,
                  'type':typeToken,
              };
          this.paramSheetAkunTabSiswa=param;
          const data = await this.postBody(this.paramSheetAkunTabSiswa);
          console.log('authRepository',{data})
        //   return this.responLoginSuccess(data);
          return data;

        // }catch(er){
        //     console.log(er)
        // }
    }
    
    responLoginSuccess(respon: Record<string, any>): ApiResponse<AkunSiswaSheet> {
         return {
            success: respon.success,
            // data: respon.success?DTOSheetUser.fromResponAkun(respon.data):undefined,
            // data: respon,//.data,
            data:respon.data,
            error:!(respon.success)?({
                code:'ERROR',
                message: 'Username / Password salah. Silakan perbaiki!',
                details: respon.data
            }):undefined,
            message:respon.success?'Login Berhasil':'Login Gagal, lihat detail di error'
        }
    }
    async getSession(): Promise<UserSiswa | null> {
    //    const session = localStorage.getItem("session");
    //     return session ? JSON.parse(session) : null;
        return getSessionApp<UserSiswa|null>();
    }
    getSessionSync(): UserSiswa | null {
        return getSessionApp<UserSiswa|null>();
    }
    // responLoginSuccess(respon:Record<string, any>):ApiResponse<AkunSheet>{
    //     return {
    //         success: respon.success,
    //         data: respon.success?DTOSheetUser.fromResponAkun(respon.data):undefined,
    //         error:!(respon.success)?({
    //             code:'ERROR',
    //             message: 'Username / Password salah. Silakan perbaiki!',
    //             details: respon.data
    //         }):undefined,
    //         message:respon.success?'Login Berhasil':'Login Gagal, lihat detail di error'
    //     }
    // }
    // async getSession() {
    //     // const session = localStorage.getItem("session");
    //     // return session ? JSON.parse(session) : null;
    //     return getSessionApp<UserPtk|null>();
    // }
    // getSessionSync() {
    //     // const session = localStorage.getItem("session");
    //     // return session ? JSON.parse(session) : null;
    //     return getSessionApp<UserPtk|null>();
    // }
    clearSession() {
        // localStorage.removeItem("session");
        clearSessionApp();
    }
}
