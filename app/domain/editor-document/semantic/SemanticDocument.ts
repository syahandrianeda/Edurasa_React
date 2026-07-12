import type { SemanticMarker } from "./SemanticMarker";
import type { SemanticGroup } from "./SemanticGroup";

export interface SemanticDocument {

    markers:
        SemanticMarker[];

    groups:
        SemanticGroup[];

}