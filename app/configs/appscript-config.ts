import macro from "../macro_react.json";
import axios from '../infrastructures/http/axios'
import { ApiErrors } from "~/infrastructures/http/api-errors";
import DTOUser from "~/dtos/dto-user";
import { clearSessionApp, saveSessionApp } from "~/infrastructures/session-storage/app-session";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import { getSessionRombel, saveSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { store } from "~/context-reduct/redux-provider";
import { setCredentials } from "~/context-reduct/global-state/auth-slice";
import { setFokusRombel } from "~/context-reduct/global-state/fokus-rombel-slice";
import { getNumberFromString } from "~/lib/get-number";

interface MacroChild {
    [key: string]: string;
}

interface MacroMap {
    [key: string]: MacroChild;
}


export type ApiError = {
  code: string            // e.g. AUTH_INVALID, VALIDATION_ERROR
  message: string         // human readable
  details?: Record<string, any[]>|undefined // validation error
}
export type typeSourceFetch = 'API'|'indexDB'|'localStorage';
export type ApiResponseTunggal<T> = {
    success: boolean
    message?: string|Record<string, any>
    data?: T
    error?: ApiError 
    source?:typeSourceFetch
}
export type ApiResponseGet<T>={
    success:boolean, 
    message?: string
    response?:T,
    errors?:ApiError,
    
}
export type ApiResponse<T> = {
    success: boolean
    message?: string|Record<string, any>
    data?: T|T[]
    error?: ApiError 
    source?:typeSourceFetch
    detailResponse?:Record<string, any>
}

export type ParamFile = {
    folder?: string
    subfolder?:string
    action?: string
    namafile: string
    base64: string
    mimeType: string
}
/**
 * kita tambahkan :
 * - indexDB
 * - store redux
 */

export class AppScriptConfig {
    private readonly macro: MacroMap;
    // private storeRedux:Store<RootState>;
    private indexDBSiswa: IndDbSiswaRepository;

    constructor(macroData: MacroMap = macro, tableIndexDB:string = 'Datasiswa') {
        this.macro = macroData;
        // this.storeRedux =  useStore();
        this.indexDBSiswa = new IndDbSiswaRepository()


    }

    get dbBrowser(){
        return this.indexDBSiswa
    }

    get stateRedux(){
        // return this.storeRedux
        return false
    }
    /** ===== Derived Keys ===== */

    get currentMacroKey(): string {
        const now = new Date();
        const month = now.getMonth(); // 0-based
        const semester = month > 5 ? 1 : 2;

        const yearStart =
        semester === 1 ? now.getFullYear() : now.getFullYear() - 1;
        const yearEnd =
        semester === 1 ? now.getFullYear() + 1 : now.getFullYear();

        return `t_${yearStart.toString().slice(2)}${yearEnd
        .toString()
        .slice(2)}_s_${semester}`;
    }

    /** ===== Macro Access ===== */

    get currentMacro(): MacroChild {
        return this.macro[this.currentMacroKey];
    }

    getMacro(key: string): MacroChild {
        return this.macro[key];
    }

    /** ===== AppScript ===== */

    get appCrudId(): string {
        const testRombel = getSessionRombel();
        let key = 'exec_crud'
        if(testRombel){
            key = "exec_crud_" + getNumberFromString(testRombel)
        }
        console.log(testRombel, key)
        // return this.currentMacro?.["exec_crud"] ?? "edurasa_crud";
        return this.currentMacro?.[key];// ?? "edurasa_crud";
    }

    get appCrudUrl(): string {
        return `https://script.google.com/macros/s/${this.appCrudId}/exec`;
    }
    get appExexUser(): string {
        return `https://script.google.com/macros/s/${this.currentMacro["exec_user"]}/exec`;
    }

    /** ==== Method post dan get dengan fetch*/
    async postBodyFetch(param:Record<string, any>){
        const fetching = await fetch(this.appCrudUrl,{
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new  URLSearchParams(param)
        })
        const pos= await fetching.json();
        
        if(pos.hasOwnProperty('auth')){
            
             this.checkAkun(pos.auth);
        }
        return pos
    }
    async getBody(param:Record<string, any>){
        const send = await axios.get(this.appCrudUrl + new URLSearchParams(param));
        return await send.data
    }
    /** === method post dengan axios */
    async postBody(param:Record<string, any>){
        const start = performance.now();
        try{
          
            const pos = await axios.post(this.appCrudUrl,
                        // param, 
                        new URLSearchParams(
                            Object.entries(param).reduce<Record<string, string>>(
                                (acc, [key, value]) => {
                                    acc[key] = String(value);
                                    return acc;
                                },
                                {}
                            )
                        ),
                        
                        {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' 
                            // 'Content-Type': 'application/json'
                        }
                    }
            );
            //   console.log(
            //     "REQUEST SUCCESS",
            //     `${((performance.now() - start) / 1000).toFixed(3)} s`,
            //     pos.status
            // );
            console.log({pos})
            //reponse axios data yang dibutuhkan, biarkan class turuunannya yang membungkus type data response-nya
            if(pos?.data && pos?.data?.hasOwnProperty('auth')){
                
                this.checkAkun(pos.data.auth);
                
            }
            // console.log('pos axios status 200', pos)
            if(pos?.data && pos.data?.success){
                return pos.data
            }else{
                throw new Error(pos?.data?.message , {cause: pos})
            }
            throw new Error(pos?.data?.message ?? 'Script Berhasil merespon, tapi gagal dikembalikan', {cause: pos})
            // if(pos.status === 200 && pos.data){
            //     if(pos.data){
            //         console.log('pos.data', pos)
            //         return pos.data;
                    
            //     }else{
                    
            //         console.log('non pos.data', pos)
            //         return pos;
            //     }
            // }else{
                
            //     console.log('sukses status non 200', pos)
            //     return new Error(pos.data.message)
            // }
        } catch (error) {
                    console.log(
                        "REQUEST ERROR",
                        `${((performance.now() - start) / 1000).toFixed(3)} s`,
                        error
                    );

            
            throw new Error(error instanceof Error ? error.message : String(error), { cause: [error]})
            // throw error
        }
        // const pos = await axios.post(this.appCrudUrl,param, {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded' 
        //     }
        // }
        // );
        
        // return pos.data;
    }
    checkAkun(auth:Record<string, any>){
        const rombel = getSessionRombel();
        if(auth){
            const {authenticated, data} = auth;
            if(authenticated){
                const updateUser =  DTOUser.fromResponAkun(data);
                saveSessionApp(updateUser);
                /** test dulu */
                //jika rombel ada di rombel:
                if(!updateUser.kelas_ampu.includes(rombel)) {

                        store.dispatch(
                            setFokusRombel({
                                value: updateUser.kelas_ampu[0],
                                name:'fokusRombel',
                                loaded:true
                            })
                        );
                        saveSessionRombel(updateUser.kelas_ampu[0]);
                };
                        
                        store.dispatch(
                            setCredentials({
                                user: updateUser,
                                name:'auth',
                                loaded:true
                            })
                        );
                        
            }
            /** else tidak pernah terpanggil 
                else{
                    clearSessionApp();
                }
             * 
            */
        }else{
            clearSessionApp();
            store.dispatch(
                            setCredentials({
                                user: null,
                                name:'auth',
                                loaded:false
                            })
                        );
                        
                        store.dispatch(
                            setFokusRombel({
                                value:undefined,
                                name:'fokusRombel',
                                loaded:false
                            })
                        );
        }
        
    }
    
    /** === Convert Respon */
    responActionRead<T>(respon:Record<string, any>):ApiResponse<T>{
        
        return {
            success: respon.success ?? respon?.info?.findTab,
            data: respon.data,
            error:(!respon.info?.findTab)? {
                        code:'EROR',
                        message: 'Data Gagal di load di reponse Read',
                        details: respon
                    }:respon.message,
            message:respon.info?.findTab?'Berhasil dipanggil':'Data Gagal di load (lihat detail error)',//respon.info,
            source:'API',
            detailResponse:respon.info
        }
    }
    
    // responActionError<T>(error: unknown): ApiResponse<T> {
    //         if (error instanceof ApiErrors) {
    //             return {
    //                 success: false,
    //                 message: error.message,
    //                 error: {
    //                     code: `HTTP_${error.status ?? 'UNKNOWN'}`,
    //                     message: error.message,
    //                     details: error.payload
    //                 },
    //                 source: 'API'
    //             };
    //         }

    //         // if (axios.isAxiosError(error)) {
    //         //     return {
    //         //         success: false,
    //         //         message: error.message,
    //         //         error: {
    //         //             code: error.code ?? 'AXIOS_ERROR',
    //         //             message: error.message,
    //         //             details: error.response?.data
    //         //         },
    //         //         source: 'API'
    //         //     };
    //         // }

    //         return {
    //             success: false,
    //             message: error instanceof Error ? error.message : 'Unknown error',
    //             error: {
    //                 code: 'UNKNOWN_ERROR',
    //                 message: error instanceof Error ? error.message : String(error),
    //                 details: error
    //             },
    //             source: 'API'
    //         };
    //     }
    responActionError<T>(error: unknown): ApiResponse<T> {
                      
//   if (axios.isAxiosError(error)) {
//     console.log('[API ERROR]', {
//       code: error.code,
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       url: error.config?.url,
//       method: error.config?.method,
//     });
//   }

//   throw error;
        if (error instanceof ApiErrors) {
                return {
                    success: false,
                    // data: null,
                    message: error?.message,
                    error: {
                        code: `HTTP_${error.status ?? 'UNKNOWN'}`,
                        message: error?.message,
                        details: error?.payload,
                        
                },
                source: 'API'
                }
            }
            
            return {
                success:false,
                // data: [error] as T,
                message: 'Terjadi kesalahan tidak terduga',
                error: {
                    code: 'UNEXPECTED_ERROR',
                    message: 'Terjadi kesalahan sistem | '+ error,
                    details: {error:[error]}
                },
                source: 'API'
            // }
        }
    }

    /** === upload file */
    
    /**
     * 
     * @param param 
     * @returns 
     */
    async uploadFile(param:ParamFile){
        try{
            const defaultParam:Partial<ParamFile> = {
                folder: 'FOLDER EDURA',
                action: 'uploadFile'
            }
    
            //
            const FixParam = Object.assign(defaultParam,param);
            
            const respon =  await this.postBody(FixParam);
            // console.log('upload dokumen di siswa', respon)
            return {
                ...respon,
            // success: true,
            // data: respon.data,
            message:'Upload berhasil',
            source:'API'
        }
        }catch(error){
            return this.responActionError(error);
        }
    }



}
