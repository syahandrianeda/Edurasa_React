import type { EngineDraftProcessingService } from "./EngineDraftProcessingService";

export interface EngineDraftProcessingServiceResult{

    success:boolean;

    service?:
        EngineDraftProcessingService;

    message?:string;

}