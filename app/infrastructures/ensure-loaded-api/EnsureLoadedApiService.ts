import type { ApiResponse } from "~/configs/appscript-config";
import type EnsureLoadedApiServiceInterface from "~/domain/interfaces/ensure-loaded-api-service";
import EnsureLoadedApiRepository from "./EnsureLoadedApiRepository";
import { IndexDbTabNameRepository } from "../iDb-vite/indexDb-tabname-repository";


export default class EnsurLoadedApiService implements EnsureLoadedApiServiceInterface{
    constructor(public repo =  new EnsureLoadedApiRepository()){}
    
    async callNeeded(paramSheet: Record<string, any>[]): Promise<ApiResponse<any>> {
        /** Kode ini  berhasil 
         try{
             const auth = this.repo.dataAuth();
             // console.log(navigator.onLine)
             const param = {
                 action:'readMultipleTab',
                 source:JSON.stringify(paramSheet),
                 auth
             }
             
             const data =  await this.repo.callNeeded(param);
     
             
             if(data){
                 if(Array.isArray(data)){
                     // console.log('respon service sukses, dan array', data);
                     return data
                 }else{
                     // console.log('respon service sukses, dan bukan array', data);
                     throw new Error(data.error?.message ?? 'Service Gagal',{cause:data})
                 }
             }else{
                 // console.log('dilempar error, karena data.succes false/ undefine', data)
                 throw new Error(data)
             }
 
         }catch(er){
             // console.log('error karena try catch', er)
             // return this.repo.responActionError(new Error('gagal',{cause:er}))
             // return new Error(er)
             throw new Error(er as string,{cause:er})
             // er
 
         }
         
        */
        try{

                /**
                 * ========================================================
                 * OFFLINE
                 *
                 * Browser sudah mengetahui bahwa koneksi tidak tersedia.
                 *
                 * Jangan mencoba request ke Apps Script.
                 * Langsung gunakan IndexedDB.
                 * ========================================================
                 */
                // console.log({navigator})
                if (!navigator.onLine) {
                    const dataDb =  await this.loadFromIndexDb(paramSheet);
                    return dataDb.map(this.repo.responActionRead) as unknown as ApiResponse<any>;
                }
    
    
                /**
                 * ========================================================
                 * ONLINE
                 *
                 * Coba mengambil data terbaru dari Apps Script.
                 * ========================================================
                 */
    
                const auth = this.repo.dataAuth();
    
                const param = {
                action: "readMultipleTab",
                source: JSON.stringify(paramSheet),
                auth,
                };
    
    
                const data = await this.repo.callNeeded(param);
                // console.log('data', {param, data})
    
                /**
                 * ========================================================
                 * API BERHASIL
                 *
                 * Pertahankan perilaku existing.
                 * ========================================================
                 */
    
                // if (data && Array.isArray(data) && data.some((item) => item.success)) {
                // return data;
                // }
                 if(data){
                    if(Array.isArray(data)){
                        // console.log('respon service sukses, dan array', data);
                        return data
                    }else{
                        // console.log('respon service sukses, dan bukan array', data);
                        throw new Error(data.error?.message ?? 'Service Gagal',{cause:data})
                    }
                }else{
                    // console.log('dilempar error, karena data.succes false/ undefine', data)
                    throw new Error(data)
                }
    
                /**
                 * ========================================================
                 * API GAGAL
                 *
                 * Gunakan IndexedDB sebagai fallback.
                 * ========================================================
                 */
    
                // return this.loadFromIndexDb(paramSheet);
                const dataDb =  await this.loadFromIndexDb(paramSheet);
                    return dataDb.map(this.repo.responActionRead) as unknown as ApiResponse<any>;
        }catch(er){
            console.log(er)
            throw new Error(er as string,{cause:er})
        }
        
    }

    /**
     * ==========================================================
     * LOAD FROM INDEXED DB
     * ==========================================================
     */

    async loadFromIndexDb(
        paramSheet: Record<string, any>[]
    ): Promise<ApiResponse<any>[]> {

        const result: ApiResponse<any>[] = [];

        for (const param of paramSheet) {

        const tabName = param?.tab;

        /**
         * Tidak mempunyai nama tab.
         */
        if (!tabName) {
            continue;
        }


        /**
         * ======================================================
         * REPOSITORY BERDASARKAN NAMA TAB
         * ======================================================
         */

        const db = new IndexDbTabNameRepository<any>(tabName);


        /**
         * ======================================================
         * PASTIKAN OBJECT STORE TERSEDIA
         *
         * Jangan membuat store baru.
         * ======================================================
         */

        const exists = await db.hasStore();

        if (!exists) {
            continue;
        }


        /**
         * ======================================================
         * BACA CACHE
         * ======================================================
         */

        const cachedData = await db.getAll();
        // console.log({cachedData})

        /**
         * ======================================================
         * FORMAT RESPONSE
         *
         * Bentuk dibuat menyerupai response API sehingga
         * AppProviderService tidak perlu mengetahui sumber data.
         * ======================================================
         */

        result.push({
            success: true,
            data: cachedData,
            detailResponse: {
                    namaTab: tabName,
                    findTab: true,
                    },
            source:'indexDB'
                });
                }
        // console.log({result})

        return result;
    }
    async create(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.repo.create(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<any>> {
        return await this.repo.update(param);
    }
}