import type { InteractionNode }
from "~/domain/editor/interactions/base-node-interaction";

import type { QuestionMutationContext }
from "./QuestionMutationContext";

export interface UpdateInteractionContext
extends QuestionMutationContext {

    interaction?:
        InteractionNode;

}