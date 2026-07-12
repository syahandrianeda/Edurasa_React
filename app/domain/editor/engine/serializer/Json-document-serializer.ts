import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { DocumentValidator } from "../validator/document-validator";
import type { DocumentSerializer } from "./type/document-serializer";
import type { SerializerResult } from "./type/serializer-result";


export class JsonDocumentSerializer
implements DocumentSerializer
{
    constructor(
        private validator: DocumentValidator
    ) {}

    serialize(
        document: QuestionBankDocument
    ): SerializerResult {

        const validation =
            this.validator.validate(document);

        if (!validation.valid) {

            return {
                success: false,
                error:
                    validation.errors
                        .map(
                            e => e.message
                        )
                        .join(", ")
            };

        }

        return {

            success: true,

            payload: {

                version:
                    document.version,

                data:
                    JSON.stringify(
                        document
                    )
            }

        };

    }

}
/**
 * 
export class JsonDocumentSerializer implements DocumentSerializer
{
    serialize(
        document: QuestionBankDocument
    ): SerializerResult {

        return {
            success: true,
            payload: {
                version: document.version,
                data: JSON.stringify(document)
            }
        };
    }
}
 */
