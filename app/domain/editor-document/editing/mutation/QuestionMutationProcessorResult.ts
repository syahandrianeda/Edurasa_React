import type { QuestionMutationResult } from "./QuestionMutationResult";

export interface QuestionMutationProcessorResult {

    success:boolean;
    mutation?: QuestionMutationResult;
    message?:string;

}