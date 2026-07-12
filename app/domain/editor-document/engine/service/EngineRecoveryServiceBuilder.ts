import type { EngineRecoveryService }
from "./EngineRecoveryService";

import type { EngineRecoveryServiceResult }
from "./EngineRecoveryServiceResult";

export class EngineRecoveryServiceBuilder{

    build():

        EngineRecoveryServiceResult{

        const service:EngineRecoveryService={

            recover(){

                return true;

            }

        };

        return{

            success:true,

            service

        };

    }

}