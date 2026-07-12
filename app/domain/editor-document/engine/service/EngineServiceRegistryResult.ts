import type { EngineServiceRegistry }
from "./EngineServiceRegistry";

export interface EngineServiceRegistryResult{

    success:boolean;

    registry?:
        EngineServiceRegistry;

    message?:string;

}