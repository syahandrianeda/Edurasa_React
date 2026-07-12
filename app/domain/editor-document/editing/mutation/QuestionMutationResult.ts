import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";

export interface QuestionMutationResult {

    success:boolean;

    document?:
        QuestionBankDocument;

    message?:string;

}