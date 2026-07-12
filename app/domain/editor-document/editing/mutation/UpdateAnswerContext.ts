import type { Answer }
from "~/domain/editor/answers/answer";

import type { QuestionMutationContext }
from "./QuestionMutationContext";

export interface UpdateAnswerContext
extends QuestionMutationContext {

    answer?:
        Answer;

}