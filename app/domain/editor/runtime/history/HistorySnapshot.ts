import type { QuestionBankDocument } from "../../document/question-bank-document";

export interface HistorySnapshot {

    timestamp:number;

    document:QuestionBankDocument;

}