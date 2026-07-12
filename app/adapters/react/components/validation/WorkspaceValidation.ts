import type { ReactNode }
from "react";

import type { WorkspaceValidationResult }
from "./WorkspaceValidationResult";

export class WorkspaceValidation{

    validate(

        children:ReactNode

    ):WorkspaceValidationResult{

        if(children===undefined||children===null){

            return{

                valid:false,

                message:"Workspace requires children."

            };

        }

        return{

            valid:true

        };

    }

}