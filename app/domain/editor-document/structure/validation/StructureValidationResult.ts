import type { StructureValidationIssue } from "./StructureValidationIssue";

export interface StructureValidationResult {

    valid:boolean;

    issues:StructureValidationIssue[];

}