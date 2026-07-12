import type { EngineMutationService }
from "./EngineMutationService";

import type { EngineMutationServiceResult }
from "./EngineMutationServiceResult";

export class EngineMutationServiceBuilder{

    build():

        EngineMutationServiceResult{

        const service:EngineMutationService={

            mutate(){

                return true;

            }

        };

        return{

            success:true,

            service

        };

    }

}