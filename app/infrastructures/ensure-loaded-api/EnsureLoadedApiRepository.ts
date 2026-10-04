import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type EnsureLoadedApiRepositoryInterface from "~/domain/interfaces/ensure-loaded-api-repository";


export default class EnsureLoadedApiRepository extends AppScriptSheet implements EnsureLoadedApiRepositoryInterface
    {
    
    constructor(){
        super()
    }

    
    
    async callNeeded(param: Record<string, any>): Promise<ApiResponse<Record<string, any>>> {
        try{
            const respon = await this.postBody(param);
            console.log('repository sukses',{respon}, respon);

            /**
             * Google kadang membalas dengan halaman HTML error
             * ("Sorry, unable to open the file at this time") alih-alih JSON,
             * lewat HTTP 200. Kegagalan ini terjadi di infrastruktur Google
             * (redirect exec -> echo) dan sifatnya SEMENTARA.
             * Dilempar sebagai error supaya service melakukan retry.
             */
            if (typeof respon === 'string') {
                throw new Error('GOOGLE_ERROR_PAGE: Google membalas dengan halaman HTML error, bukan JSON (sifatnya sementara)', {cause: respon})
            }

            if(respon.collections){
                return respon.collections.map(this.responActionRead);
            }else{
                throw new Error(respon.message ?? 'respon repository tidak punya collections / success = false',{cause:respon})
            }
        }catch(error){
            console.log('repository gagal',{error})
            const message = error instanceof Error
                ? error.message
                : typeof error === 'string'
                    ? error
                    : 'Unknown repository error';
            // return this.responActionError(error);
            throw new Error(message, { cause: error })
        }
        
    }

    
    async update(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.postBody(param);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.postBody(param);
    }
}