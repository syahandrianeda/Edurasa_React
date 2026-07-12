import type { QuestionCollection } from "./QuestionCollection";
import type { QuestionCollectionSummary } from "./QuestionCollectionSummary";

export interface QuestionCollectionAggregate {

    collection: QuestionCollection;
    summary: QuestionCollectionSummary;

}