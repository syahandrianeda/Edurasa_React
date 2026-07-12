import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionEditCommandResult } from "./QuestionEditCommandResult";
// import type { QuestionEditCommandResult } from "./QuestionEditCommandResult";

export interface QuestionEditCommand {

    execute(

        document:
            QuestionBankDocument

    ): QuestionEditCommandResult;

}