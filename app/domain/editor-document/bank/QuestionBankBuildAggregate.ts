import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionBankBuildSummary } from "./QuestionBankBuildSummary";

export interface QuestionBankBuildAggregate {

    document: QuestionBankDocument;
    summary: QuestionBankBuildSummary;

}