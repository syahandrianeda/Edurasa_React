import type { SectionNode }
from "~/domain/editor/sections/section-node";

import type { QuestionMutationContext }
from "./QuestionMutationContext";

export interface UpdatePertanyaanContext
extends QuestionMutationContext {

    pertanyaan?:
        SectionNode;

}