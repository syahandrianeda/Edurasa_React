import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";

export interface QuestionEditResult {
    success:boolean;
    document?: QuestionBankDocument;
    message?:string;
}