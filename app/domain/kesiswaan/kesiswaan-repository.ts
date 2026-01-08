import AppScriptSheet from "~/configs/appscript-sheet";
import type { SiswaType } from "~/types/siswa";
import type KesiswaanRepositoryInterface from "../interfaces/kesiswaan-repository-interface";
import EduraIndexDB from "~/infrastructures/indexDb/indexdb-class";
import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import { DTOSiswa } from "~/dtos/dto-siswa";
import { indexedDBService } from "~/infrastructures/indexDb/indexDB-service";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";


export default class KesiswaanRepository extends AppScriptSheet implements KesiswaanRepositoryInterface{
    private indexDB;
    
    private STORE:string;

    constructor(table:string){
        super();
        if (!table) {
                throw new Error("KesiswaanRepository: table name is required");
            }

            this.STORE = table;
            // this.indexDB = new EduraIndexDB(table);
            this.indexDB = new IndDbSiswaRepository();
        

    }
    async loadAllSiswa(): Promise<ApiResponse<SiswaType> | null> {
        
        try{
            const dataIndexDB = await this.indexDB.getAll()
            console.log('emang indexDB ga kebaca', dataIndexDB);
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
            console.log('callData dari Axios bukan sih?',callData)
            
            // if (callData.success ) {
            // }
            await this.indexDB.saveBulk(callData.data)
        
            return this.responActionRead(callData);
        }catch(error){
            return this.responActionError(error);
        }

        
    }
    async uploadFileRepo(param: ParamFile): Promise<any> {
        
        return await this.uploadFile(param)
    }
}