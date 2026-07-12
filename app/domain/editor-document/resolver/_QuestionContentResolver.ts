import type { EditorDocument }
from "../EditorDocument";

import type { SemanticMarker }
from "../semantic/SemanticMarker";

import type { ContentNode }
from "~/domain/editor/contents/base-node";

import type { ContentFragment }
from "./ContentFragment";

export class QuestionContentResolver {

    resolve(

        document:
            EditorDocument,

        marker:
            SemanticMarker

    ): ContentFragment {

        const node =

            this.findNode(

                document.children,

                marker
                    .selection
                    .range
                    .anchor
                    .nodeId

            );

        if (
            !node
        ) {

            return {

                nodes:[]

            };

        }

        return {

            nodes:[
                node
            ]

        };

    }

    private findNode(

        nodes:
            ContentNode[],

        nodeId:
            string

    ):
        ContentNode
        | undefined
    {

        return nodes.find(

            node =>

                node.id ===
                nodeId

        );

    }

}