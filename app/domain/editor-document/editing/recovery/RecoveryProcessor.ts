import { UndoCommand }
from "./UndoCommand";

import { RedoCommand }
from "./RedoCommand";

import { RecoveryWorkflowBuilder }
from "./workflow/RecoveryWorkflowBuilder";

import type { RecoveryProcessorContext }
from "./RecoveryProcessorContext";

import type { RecoveryProcessorResult }
from "./RecoveryProcessorResult";
import { MutationReplayProcessor } from "./replay/MutationReplayProcessor";

export class RecoveryProcessor{
    constructor(
        private undo = new UndoCommand(),
        private redo = new RedoCommand(),
        private workflowBuilder = new RecoveryWorkflowBuilder(),
        private replay = new MutationReplayProcessor()
    ){}
    // constructor(

    //     private undo =
    //         new UndoCommand(),

    //     private redo =
    //         new RedoCommand(),

    //     private workflowBuilder =
    //         new RecoveryWorkflowBuilder()

    // ){}

    process(

        context:
            RecoveryProcessorContext

    ): RecoveryProcessorResult{

        const workflow = this.workflowBuilder .build();
        const navigation = context.action === "undo" ? 
            this.undo.execute({ timeline: context.timeline })
            :
            this.redo.execute({ timeline: context.timeline });

        if( !navigation.success || !navigation.timeline ){
            return{
                success:false,
                workflow: workflow.workflow,
                message: navigation.message
            };
        };

        const replay = this.replay.replay({ timeline: navigation.timeline });

        if( !replay.success ){
            return{
                success:false,
                workflow: workflow.workflow,
                message: replay.message
            };
        }

        // return{
        //     success:true,
        //     workflow: workflow.workflow,
        //     timeline: navigation.timeline
        // };
        return{
            success:true,
            workflow: workflow.workflow,
            timeline: replay.timeline
        };

    }

}