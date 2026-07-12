import type { QuestionNode }
from "~/domain/editor/document/question-node";

export interface DraftTransformationResult {

    transformed:number;

    questions:
        QuestionNode[];

}