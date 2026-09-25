import AppScriptSheet from "~/configs/appscript-sheet";
import type { SiswaType } from "~/types/siswa";
import type KesiswaanRepositoryInterface from "../../domain/interfaces/kesiswaan-repository-interface";
import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import { saveIsianSiswa } from "~/infrastructures/session-storage/isian-siswa";


export default class KesiswaanRepository extends AppScriptSheet implements KesiswaanRepositoryInterface{
    // private indexDB;
    
    // private STORE:string;

    constructor(table:string){
        super();
        if (!table) {
                throw new Error("KesiswaanRepository: table name is required");
            }
            // this.STORE = table;
            // this.indexDB = new IndDbSiswaRepository();
    }
    async loadAllSiswa(): Promise<ApiResponse<SiswaType> | null> {
        
        try{
            const dataIndexDB = await this.dbBrowser.getAll()
            
            if (dataIndexDB.length > 0) {
                return {
                    success: true,
                    data: dataIndexDB,
                    message:'Data diambil dari indexDB',
                    source:'indexDB'
                }
            }
            const parameter = {
                action: 'read',
            }
            this.paramSheetAkunTabSiswa = parameter;

            const callData = await this.postBody(this.paramSheetAkunTabSiswa);
            // await this.indexDB.saveBulk(callData.data)
            await this.dbBrowser.saveBulk(callData.data)
            
            //simpan di session ini:
            const formatIsianSiswa = callData.info.objKosong;
            saveIsianSiswa(formatIsianSiswa);
            
            return this.responActionRead(callData);
        }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
    }
    async loadAllSiswaAPI(): Promise<ApiResponse<SiswaType> | null> {
        
        try{
            
            const parameter = {
                action: 'read',
            }
            this.paramSheetAkunTabSiswa = parameter;

            const callData = await this.postBody(this.paramSheetAkunTabSiswa);
            // await this.indexDB.saveBulkAgain(callData.data)
            await this.dbBrowser.saveBulkAgain(callData.data)
            
            //simpan di session ini:
            const formatIsianSiswa = callData.info.objKosong;
            saveIsianSiswa(formatIsianSiswa);
            
            return this.responActionRead(callData);
        }catch(error){
            return this.responActionError(error);
        }

        
    }
    async uploadFileRepo(param: ParamFile): Promise<any> {
        
        return await this.uploadFile(param)
    }
    async update(param:Record<string, any>):Promise<ApiResponse<SiswaType>>{
        try{
            
            this.paramSheetAkunTabSiswa = param;
            
            const respon =  await this.postBody(this.paramSheetAkunTabSiswa );
            
            await this.dbBrowser.saveBulkAgain(respon.data)

            return this.responActionRead(respon);

        }catch(error){
            return this.responActionError(error);
        }
    }
    async create(param:Record<string, any>):Promise<ApiResponse<SiswaType>>{
        try{
            const parameter = {
                ...param,
                action: 'create'
            }
            this.paramSheetAkunTabSiswa = parameter;
            
            const respon =  await this.postBody(this.paramSheetAkunTabSiswa );
            
            await this.dbBrowser.saveBulkAgain(respon.data)

            return this.responActionRead(respon);

        }catch(error){
            return this.responActionError(error);
        }
    }
}