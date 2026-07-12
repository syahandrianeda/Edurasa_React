import type { EngineDraftProcessingService }
from "./EngineDraftProcessingService";

import type { EngineDraftProcessingServiceResult }
from "./EngineDraftProcessingServiceResult";

export class EngineDraftProcessingServiceBuilder{

    build():

        EngineDraftProcessingServiceResult{

        const service:EngineDraftProcessingService={

            execute(){

                return true;

            }

        };

        return{

            success:true,

            service

        };

    }

}