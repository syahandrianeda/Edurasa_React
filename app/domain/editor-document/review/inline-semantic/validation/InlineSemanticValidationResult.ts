import type { InlineSemanticValidationIssue } from "./InlineSemanticValidationIssue";

export interface InlineSemanticValidationResult {
    valid:boolean;
    issues: InlineSemanticValidationIssue[];
}