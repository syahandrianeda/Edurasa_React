import type { MutationWorkflow }
from "./MutationWorkflow";

import type { MutationWorkflowResult }
from "./MutationWorkflowResult";

export class MutationWorkflowBuilder {

    build():
        MutationWorkflowResult {

        const workflow:
            MutationWorkflow = {

            steps:[

                "resolve-target",

                "execute-mutation",

                "complete"

            ]

        };

        return{

            success:true,

            workflow

        };

    }

}