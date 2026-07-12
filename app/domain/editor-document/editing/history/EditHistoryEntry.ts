import type { QuestionChangeSet } from "../change/QuestionChangeSet";
import type { QuestionEditCommand }
from "../command/QuestionEditCommand";

export interface EditHistoryEntry {
    id:string;
    timestamp:Date;
    questionId:string; 
    // command: QuestionEditCommand;
    changeSet: QuestionChangeSet;

}