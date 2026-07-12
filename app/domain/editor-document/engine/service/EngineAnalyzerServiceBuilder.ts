import type { EngineAnalyzerService }
from "./EngineAnalyzerService";

import type { EngineAnalyzerServiceResult }
from "./EngineAnalyzerServiceResult";

export class EngineAnalyzerServiceBuilder{

    build():

        EngineAnalyzerServiceResult{

        const service:EngineAnalyzerService={

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