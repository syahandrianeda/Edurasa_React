import type { EngineServiceRegistry }
from "./EngineServiceRegistry";

import type { EngineDependencyResolverResult }
from "./EngineDependencyResolverResult";

export class EngineDependencyResolver{

    resolve(

        registry:
            EngineServiceRegistry,

        serviceName:
            string

    ):EngineDependencyResolverResult{

        const service =

            registry.services.find(

                service =>

                    service.name === serviceName

            );

        if(

            !service

        ){

            return{

                success:false,

                message:

                    `Service '${serviceName}' tidak ditemukan`

            };

        }

        return{

            success:true,

            service

        };

    }

}