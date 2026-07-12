import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { SerializerResult } from "./serializer-result";

export interface DocumentSerializer {
    serialize(
        document: QuestionBankDocument
    ): SerializerResult;
}
