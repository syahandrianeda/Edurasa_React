import type { EngineQuestionBankService }
from "./EngineQuestionBankService";

import type { EngineQuestionBankServiceResult }
from "./EngineQuestionBankServiceResult";

export class EngineQuestionBankServiceBuilder{

    build():

        EngineQuestionBankServiceResult{

        const service:EngineQuestionBankService={

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