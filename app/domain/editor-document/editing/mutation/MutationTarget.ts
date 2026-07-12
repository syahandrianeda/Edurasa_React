import type { QuestionNode }
from "~/domain/editor/document/question-node";

export interface MutationTarget {

    question:
        QuestionNode;

    index:
        number;

}