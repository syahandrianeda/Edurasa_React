import type { EntityNode } from "~/domain/editor/inlines/entities-node";
import type { EquationNode } from "../equation/EquationNode";

export interface InlineSemanticCollection {
    entities: EntityNode[];
    equations: EquationNode[];

}