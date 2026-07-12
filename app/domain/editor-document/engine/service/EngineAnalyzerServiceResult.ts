import type { EngineAnalyzerService }
from "./EngineAnalyzerService";

export interface EngineAnalyzerServiceResult{

    success:boolean;

    service?:
        EngineAnalyzerService;

    message?:string;

}