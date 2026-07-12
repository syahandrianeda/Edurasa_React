import type { EditorApplication }
from "../EditorApplication";

import type { EditorApplicationState }
from "../EditorApplicationState";

import type { EditorApplicationStateResult }
from "./EditorApplicationStateResult";

export class EditorApplicationStateManager{

    transition(

        application:EditorApplication,

        state:EditorApplicationState

    ):EditorApplicationStateResult{

        return{

            success:true,

            application:{

                ...application,

                state

            }

        };

    }

}