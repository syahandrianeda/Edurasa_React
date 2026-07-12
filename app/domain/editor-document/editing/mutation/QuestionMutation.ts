import type { QuestionMutationContext } from "./QuestionMutationContext";
import type { QuestionMutationResult } from "./QuestionMutationResult";

export interface QuestionMutation {

    mutate(

        context:
            QuestionMutationContext

    ): QuestionMutationResult;

}