import type { QuestionMutationCommand }
from "./QuestionMutationCommand";

import type { QuestionMutationContext }
from "./QuestionMutationContext";

import type { QuestionMutationCommandResult }
from "./QuestionMutationCommandResult";

export abstract class BaseQuestionMutationCommand
implements QuestionMutationCommand {

    abstract execute(

        context:
            QuestionMutationContext

    ): QuestionMutationCommandResult;

}