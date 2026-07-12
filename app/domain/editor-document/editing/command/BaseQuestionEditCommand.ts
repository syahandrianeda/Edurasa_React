import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionEditCommand } from "./QuestionEditCommand";
import type { QuestionEditCommandResult } from "./QuestionEditCommandResult";

export abstract class BaseQuestionEditCommand implements QuestionEditCommand {

    abstract execute(
        document:
            QuestionBankDocument
    ): QuestionEditCommandResult;

}