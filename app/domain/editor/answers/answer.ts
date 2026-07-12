import type { AnswerType } from "./answer-type";

export interface Answer {

    type: AnswerType;

    value: unknown;
}