import type { EngineMutationService }
from "./EngineMutationService";

export interface EngineMutationServiceResult{
    success:boolean;
    service?: EngineMutationService;
    message?:string;

}