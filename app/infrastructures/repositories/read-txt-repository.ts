import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { ReadTxtRepositoryInterface } from "~/domain/interfaces/read-text-repository-interface";

export default class ReadTxtRepository extends AppScriptSheet implements ReadTxtRepositoryInterface{
    async readFile(param: Record<string, any>): Promise<any> {
        
        try{
            const respon =  await this.postBody(param)
            console.log({respon})
            return {
                success:true,
                data: respon.data,
            }
            

        }catch(er){
                // return this.responActionError(error);
                 throw er instanceof Error ? er : new Error(String(er))
            }
    }
}