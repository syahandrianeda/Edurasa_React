import type { EditorDocument } from "../EditorDocument";

import { EditorDocumentSerializer } from "./EditorDocumentSerializer";

import { EditorDocumentDeserializer } from "./EditorDocumentDeserializer";

export class EditorDocumentPersistenceFacade {

    constructor(

        private serializer =
            new EditorDocumentSerializer(),

        private deserializer =
            new EditorDocumentDeserializer()

    ) {}

    export(
        document:
            EditorDocument
    ): string {

        return JSON.stringify(

            this.serializer.serialize(
                document
            )

        );

    }

    import(
        payload:
            string
    ): EditorDocument {

        return this.deserializer
            .deserialize(

                JSON.parse(
                    payload
                )

            );

    }

}