import type { EditorLifecycle }
from "./EditorLifecycle";

import type { EditorLifecycleState }
from "./EditorLifecycleState";

import type { EditorLifecycleResult }
from "./EditorLifecycleResult";

export class EditorLifecycleManager{

    transition(

        lifecycle:
            EditorLifecycle,

        next:
            EditorLifecycleState

    ):EditorLifecycleResult{

        if(

            lifecycle.current === next

        ){

            return{

                success:true,

                lifecycle

            };

        }

        return{

            success:true,

            lifecycle:{

                previous:
                    lifecycle.current,

                current:
                    next

            }

        };

    }

}