import type { EntityNode }
from "~/domain/editor/inlines/entities-node";

// import type { EquationNode } from "../../equation/EquationNode";

import type { InlineSemanticIssue }
from "./InlineSemanticIssue";
import type { EquationNode } from "../equation/EquationNode";

export interface InlineSemanticReview {

    entities:
        EntityNode[];

    equations:
        EquationNode[];

    issues:
        InlineSemanticIssue[];

}