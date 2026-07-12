import type { QuestionNode } from "~/domain/editor/document/question-node";

export interface QuestionDraftTransformResult {

    success:boolean;

    question?:QuestionNode;

    message?:string;

}