import type { QuestionBankDocument }
from "~/domain/editor/document/question-bank-document";

export interface EditingSnapshot {

    id:string;

    createdAt:Date;

    document:
        QuestionBankDocument;

}