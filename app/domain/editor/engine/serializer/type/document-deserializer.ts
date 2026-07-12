import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { SerializedDocument } from "./serialized-document";

export interface DocumentDeserializer {
    deserialize(
        payload: SerializedDocument
    ): QuestionBankDocument;
}