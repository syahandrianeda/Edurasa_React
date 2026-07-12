import type { DraftValidationSummary }
from "../draft/validation/DraftValidationSummary";

export interface DraftValidationProcessResult {

    validDrafts:number;

    invalidDrafts:number;

    summary:
        DraftValidationSummary;

}