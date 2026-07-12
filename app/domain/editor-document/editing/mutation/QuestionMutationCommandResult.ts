import type { QuestionMutationResult }
from "./QuestionMutationResult";

export interface QuestionMutationCommandResult {
    success:boolean;
    mutation?: QuestionMutationResult;
    message?:string;

}