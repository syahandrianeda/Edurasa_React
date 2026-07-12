import type { EngineRecoveryService }
from "./EngineRecoveryService";

export interface EngineRecoveryServiceResult{

    success:boolean;

    service?:
        EngineRecoveryService;

    message?:string;

}