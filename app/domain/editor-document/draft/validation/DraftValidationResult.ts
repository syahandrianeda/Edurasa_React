import type { DraftValidationIssue } from "./DraftValidationIssue";

export interface DraftValidationResult {

    valid:boolean;

    issues:
        DraftValidationIssue[];

}