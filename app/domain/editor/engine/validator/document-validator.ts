import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { ValidationResult } from "./type/validation-result";

export interface DocumentValidator {
    validate(
        document: QuestionBankDocument
    ): ValidationResult
}