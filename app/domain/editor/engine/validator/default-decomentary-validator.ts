import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { DocumentValidator } from "./document-validator";
import type { ValidationResult } from "./type/validation-result";

export class DefaultDocumentValidator
implements DocumentValidator
{
    validate(
        document: QuestionBankDocument
    ): ValidationResult {

        return {

            valid: true,

            errors: []

        };

    }

}