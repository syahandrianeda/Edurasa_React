export interface QuestionChange {
    questionId:string;
    field:string;
    oldValue?:unknown;
    newValue?:unknown;
}