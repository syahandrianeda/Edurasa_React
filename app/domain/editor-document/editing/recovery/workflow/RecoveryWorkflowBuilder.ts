import type { RecoveryWorkflow }
from "./RecoveryWorkflow";

import type { RecoveryWorkflowResult }
from "./RecoveryWorkflowResult";

export class RecoveryWorkflowBuilder{

    build():RecoveryWorkflowResult{

        const workflow:RecoveryWorkflow={

            steps:[

                {

                    id:"validate",

                    title:"Validate Timeline",

                    completed:false

                },

                {

                    id:"navigate",

                    title:"Navigate Snapshot",

                    completed:false

                },

                {

                    id:"restore",

                    title:"Restore Snapshot",

                    completed:false

                }

            ]

        };

        return{

            success:true,

            workflow

        };

    }

}