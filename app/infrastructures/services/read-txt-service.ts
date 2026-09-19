import type { ReadTxtRepositoryInterface } from "~/domain/interfaces/read-text-repository-interface";
import type { ReadTxtServiceInterface } from "~/domain/interfaces/read-txt-service-interface";
import ReadTxtRepository from "../repositories/read-txt-repository";
import type { ApiResponse } from "~/configs/appscript-config";

export default class ReadTxtService implements ReadTxtServiceInterface{
    constructor(public repo:ReadTxtRepositoryInterface = new ReadTxtRepository()){}

    async readFile(param: Record<string, any>): Promise<ApiResponse<string>> {
        try{
            const newParam = {idmateri: param.idFile, action:'readTxt'}
            return await this.repo.readFile(newParam)

        }catch(er){
            throw new Error(er as string, {cause:er})
        }
    }
}