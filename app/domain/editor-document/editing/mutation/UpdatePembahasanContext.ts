import type { SectionNode }
from "~/domain/editor/sections/section-node";

import type { QuestionMutationContext }
from "./QuestionMutationContext";

export interface UpdatePembahasanContext
extends QuestionMutationContext {

    pembahasan?:
        SectionNode;

}