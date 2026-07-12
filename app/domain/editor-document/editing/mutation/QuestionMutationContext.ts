import type { QuestionBankDocument }
from "~/domain/editor/document/question-bank-document";

export interface QuestionMutationContext {

    document:
        QuestionBankDocument;

    questionId:
        string;

}