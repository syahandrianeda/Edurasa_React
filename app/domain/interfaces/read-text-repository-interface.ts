import type { ApiResponse } from "~/configs/appscript-config";

export interface ReadTxtRepositoryInterface{
     readFile(param:Record<string, any>):Promise<any>;
}