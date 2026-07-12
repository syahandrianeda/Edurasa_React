import type { QuestionMutation }
from "./QuestionMutation";

import type { QuestionMutationContext }
from "./QuestionMutationContext";

import type { QuestionMutationResult }
from "./QuestionMutationResult";

export abstract class BaseQuestionMutation
implements QuestionMutation {

    abstract mutate(

        context:
            QuestionMutationContext

    ): QuestionMutationResult;

}