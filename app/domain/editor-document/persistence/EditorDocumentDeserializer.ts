import type { EditorDocument } from "../EditorDocument";
import { createDefaultNodeHydrationRegistry } from "./hydration/DefaultNodeHydrationRegistry";

import type { SerializedEditorDocument } from "./SerializedEditorDocument";

export class EditorDocumentDeserializer {
    constructor(

        private registry = createDefaultNodeHydrationRegistry()

    ){}    
    
    deserialize(
        payload:
            SerializedEditorDocument
    ): EditorDocument {

        return {

            version:
                payload.version,

            metadata:
                {
                    ...payload.metadata
                },

            // children: structuredClone( payload.children ) as never
            children: this.hydrateNodes( payload.children )

        };

    }
    private hydrateNodes(
        nodes: unknown[]
    )
    {
        return nodes.map(
            node => {

                const type =
                    (node as {
                        type:string
                    }).type;

                return this.registry
                    .get(type)
                    .hydrate(node);

            }
        );
    }
}