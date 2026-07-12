import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";

export interface QuestionEditCommandResult {

    success:boolean;

    document?:
        QuestionBankDocument;

    message?:string;

}