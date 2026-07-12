import type { QuestionMutationContext } from "./QuestionMutationContext";

import type { QuestionMutationCommandResult } from "./QuestionMutationCommandResult";

export interface QuestionMutationCommand {

    execute(

        context:
            QuestionMutationContext

    ): QuestionMutationCommandResult;

}