import type { EditorDocument }
from "../EditorDocument";

import type { SemanticMarker }
from "../semantic/SemanticMarker";

import type { OptionResolveResult }
from "./OptionResolveResult";

import { NodeTraversalEngine }
from "../traversal/NodeTraversalEngine";

import { FragmentTextBuilder }
from "../extraction/FragmentTextBuilder";

export class OptionResolver {

    constructor(

        private traversal =
            new NodeTraversalEngine(),

        private textBuilder =
            new FragmentTextBuilder()

    ) {}

    resolve(

        markers:
            SemanticMarker[],

        document:
            EditorDocument

    ): OptionResolveResult {

        const options:
            string[]
            = [];

        for (

            const marker

            of markers

        ) {

            const traversalResult =

                this.traversal
                    .traverse(

                        document,

                        marker
                            .selection
                            .range

                    );

            const textResult = this.textBuilder.build( traversalResult .fragment );

            options.push(

                textResult
                    .text
                    .trim()

            );

        }

        return {

            options

        };

    }

}