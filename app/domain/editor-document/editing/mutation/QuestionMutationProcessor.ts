import type { QuestionMutationContext } from "./QuestionMutationContext";
import type { QuestionMutationCommand } from "./QuestionMutationCommand";
import type { QuestionMutationProcessorResult } from "./QuestionMutationProcessorResult";
import { MutationWorkflowBuilder } from "./workflow/MutationWorkflowBuilder";

export class QuestionMutationProcessor {
    constructor(
        private workflow = new MutationWorkflowBuilder()

    ){}

    process(
        context: QuestionMutationContext,
        command: QuestionMutationCommand

    ): QuestionMutationProcessorResult {

        const result = command.execute(
                context
            );

        if ( !result.success || !result.mutation ) {
            return {
                success:false,
                message: result.message
            };

        }
        const workflow = this.workflow .build();

        if( !workflow.success ){
            return{
                success:false,
                message: "Workflow mutation gagal dibuat"
            };
        }

        return {

            success:true,
            mutation: result.mutation
        };

    }

}