import type { EditorDocument }
from "../EditorDocument";

import type { SemanticMarker }
from "../semantic/SemanticMarker";

import type { ContentFragment }
from "./ContentFragment";

import { NodeTraversalEngine }
from "../traversal/NodeTraversalEngine";
import { ContentFragmentBuilder } from "./ContentFragmentBuilder";

export class QuestionContentResolver {

    constructor(

        private traversalEngine = new NodeTraversalEngine(),
        private fragmentBuilder = new ContentFragmentBuilder()


    ) {}

    resolve(

        document:
            EditorDocument,

        marker:
            SemanticMarker

    ): ContentFragment {

        const result =

            this.traversalEngine
                .traverse(

                    document,

                    marker.selection.range

                );
        return this
                .fragmentBuilder
                .build(

                    result
                        .fragment

                );
        // return {

        //     nodes:

        //         result
        //             .fragment
        //             .nodes

        // };

    }

}