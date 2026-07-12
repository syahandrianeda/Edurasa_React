import type { QuestionEditCommand } from "./command/QuestionEditCommand";

export interface QuestionEditOperation {

    questionId:string;

    // operation:string; //direfactor di milestone 5.5.2
    command: QuestionEditCommand;

}