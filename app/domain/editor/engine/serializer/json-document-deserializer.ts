import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { MigrationRunner } from "./migration/migration-runner";
import type { DocumentDeserializer } from "./type/document-deserializer";
import type { SerializedDocument } from "./type/serialized-document";

export class
JsonDocumentDeserializer
implements DocumentDeserializer
{
    constructor(
        private migrationRunner:
            MigrationRunner
    ) {}

    deserialize(
        payload:
            SerializedDocument
    ): QuestionBankDocument {

        const document =
            JSON.parse(
                payload.data
            );

        const migrated =
            this.migrationRunner
                .run(document);

        return migrated as QuestionBankDocument;

    }

}