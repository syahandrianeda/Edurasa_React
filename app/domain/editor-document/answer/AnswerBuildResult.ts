import type { Answer } from "~/domain/editor/answers/answer";

export interface AnswerBuildResult {
    success:boolean;
    answer?:Answer;
    message?:string;
}