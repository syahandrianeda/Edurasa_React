import type { EditorDocument }
from "../EditorDocument";

import type { DocumentPosition }
from "./DocumentPosition";

export class DocumentPositionResolver {

    resolve(

        document:
            EditorDocument,

        nodeId:
            string

    ):
        DocumentPosition
        | null
    {

        const index =

            document
                .children
                .findIndex(

                    node =>

                        node.id ===
                        nodeId

                );

        if (
            index === -1
        ) {

            return null;

        }

        return {

            nodeId,

            index

        };

    }

}