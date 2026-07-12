import type { EngineService }
from "./EngineService";

export interface EngineDependencyResolverResult{

    success:boolean;

    service?:
        EngineService;

    message?:string;

}