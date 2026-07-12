import type { EditorDocument } from "../EditorDocument";

import type { SerializedEditorDocument } from "./SerializedEditorDocument";

export class EditorDocumentSerializer {

    serialize(
        document: EditorDocument
    ): SerializedEditorDocument {

        return {

            version:
                document.version,

            metadata:
                {
                    ...document.metadata
                },

            children:
                structuredClone(
                    document.children
                )

        };

    }

}