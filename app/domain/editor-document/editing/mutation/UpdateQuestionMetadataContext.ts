import type { QuestionMetadata }
from "~/domain/editor/metadata/question-meta-data";

import type { QuestionMutationContext }
from "./QuestionMutationContext";

export interface UpdateQuestionMetadataContext
extends QuestionMutationContext {

    metadata:
        QuestionMetadata;

}