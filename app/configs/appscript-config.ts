import macro from "../macro.json";
// import axios from 'axios';
import axios from '../infrastructures/http/axios'
import { ApiErrors } from "~/infrastructures/http/api-errors";

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

export class AppScriptConfig {
    private readonly macro: MacroMap;

    constructor(macroData: MacroMap = macro) {
        this.macro = macroData;
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
        return this.currentMacro?.["exec_crud"] ?? "edurasa_crud";
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
        return await fetching.json();
    }

    /** === method post dengan axios */
    async postBody(param:Record<string, any>){
        
        try{
            const pos = await axios.post(this.appCrudUrl,param, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' 
                        }
                    }
            );
            //reponse axios data yang dibutuhkan, biarkan class turuunannya yang membungkus type data response-nya
            
            return pos.data;
        }catch(error){
            
            return this.responActionError(error);
        }finally{

        }
        // const pos = await axios.post(this.appCrudUrl,param, {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded' 
        //     }
        // }
        // );
        
        // return pos.data;
    }

    
    /** === Convert Respon */
    responActionRead<T>(respon:Record<string, any>):ApiResponse<T>{
        
        return {
            success: respon.info.findTab,
            data: respon.data,
            error:(!respon.info.findTab)? {
                        code:'EROR',
                        message: 'Data Gagal di load di reponse Read',
                        details: respon.info
                    }:undefined,
            message:respon.info.findTab?'Berhasil dipanggil':'Data Gagal di load (lihat detail error)',//respon.info,
            source:'API',
            detailResponse:respon.info
        }
    }
    responActionError<T>(error: unknown): ApiResponse<T> {
    if (error instanceof ApiErrors) {
        return {
            success: false,
            // data: null,
            message: error?.message,
            error: {
                code: `HTTP_${error.status ?? 'UNKNOWN'}`,
                message: error.message,
                details: error.payload
        },
        source: 'API'
        }
    }
    
    return {
        success: false,
        // data: null,
        message: 'Terjadi kesalahan tidak terduga',
        error: {
            code: 'UNEXPECTED_ERROR',
            message: 'Terjadi kesalahan sistem | '+error,
            details: {error:[error]}
        },
        source: 'API'
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
            return {
            success: true,
            data: respon,
            message:'Upload berhasil',
            source:'API'
        }
        }catch(error){
            return this.responActionError(error);
        }
    }

   

}
