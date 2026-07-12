import type { SectionNode }
from "~/domain/editor/sections/section-node";

import type { QuestionMutationContext }
from "./QuestionMutationContext";

export interface UpdateStimulusContext
extends QuestionMutationContext {

    stimulus?:
        SectionNode;

}