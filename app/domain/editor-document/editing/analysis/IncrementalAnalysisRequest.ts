import type { QuestionChangeSet }
from "../change/QuestionChangeSet";

export interface IncrementalAnalysisRequest {

    changeSet:
        QuestionChangeSet;

}