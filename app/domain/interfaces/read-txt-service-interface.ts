import type { ApiResponse } from "~/configs/appscript-config";
import type { ReadTxtRepositoryInterface } from "./read-text-repository-interface";

export interface ReadTxtServiceInterface{
    repo: ReadTxtRepositoryInterface
    readFile(param:Record<string, any>):Promise<ApiResponse<string>>;
}