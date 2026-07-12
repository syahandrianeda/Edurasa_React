import type { SemanticValidationError }
from "./SemanticValidationError";

export interface SemanticValidationResult {

    valid:boolean;

    errors:
        SemanticValidationError[];

}