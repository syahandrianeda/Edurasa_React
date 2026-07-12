import type { ParagraphNode }
from "~/domain/editor/contents/paragraph-node";

import type { InlineNode }
from "~/domain/editor/inlines/inline-node";

import type { SelectionFragment }
from "./SelectionFragment";

import type { ContentFragment }
from "./ContentFragment";

import { TextExtractionEngine }
from "../extraction/TextExtractionEngine";

export class ContentFragmentBuilder {

    constructor(

        private extractor =
            new TextExtractionEngine()

    ) {}
    
    build(
            fragment:
                SelectionFragment
    ): ContentFragment {

        const inlines:
            InlineNode[] = [];

        const firstNode =
            fragment.nodes[0];

        const lastNode =
            fragment.nodes[
                fragment.nodes.length - 1
            ];

        for (
            const node
            of fragment.nodes
        ) {

            if (
                node.type !==
                "paragraph"
            ) {
                continue;
            }

            const paragraph =
                node as ParagraphNode;

            let startOffset = 0;

            let endOffset =
                Number.MAX_SAFE_INTEGER;

            if (
                node.id ===
                firstNode?.id
            ) {

                startOffset =
                    fragment
                        .range
                        .anchor
                        .offset;

            }

            if (
                node.id ===
                lastNode?.id
            ) {

                endOffset =
                    fragment
                        .range
                        .focus
                        .offset;

            }

            const extraction =

                this.extractor
                    .extract(
                        paragraph,
                        startOffset,
                        endOffset
                    );

            inlines.push(
                ...extraction.inlines
            );

        }

        return {

            nodes:
                fragment.nodes,

            inlines

        };

    }
    build_(

        fragment:
            SelectionFragment

    ): ContentFragment {

        const inlines:
            InlineNode[]
            = [];

        for (

            const node

            of fragment.nodes

        ) {

            if (

                node.type !==
                "paragraph"

            ) {

                continue;

            }

            const paragraph =
                node as ParagraphNode;

            const extraction =

                this.extractor
                    .extract(

                        paragraph,

                        0,

                        Number.MAX_SAFE_INTEGER

                    );

            inlines.push(

                ...extraction
                    .inlines

            );

        }

        return {

            nodes:
                fragment.nodes,

            inlines

        };

    }

}