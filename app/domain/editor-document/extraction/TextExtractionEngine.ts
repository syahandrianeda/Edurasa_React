import type { ParagraphNode }
from "~/domain/editor/contents/paragraph-node";

import type { InlineNode }
from "~/domain/editor/inlines/inline-node";

import type { ExtractionResult }
from "./ExtractionResult";

export class TextExtractionEngine {

    extract(

        paragraph:
            ParagraphNode,

        startOffset:
            number,

        endOffset:
            number

    ): ExtractionResult {

        const result:
            InlineNode[]
            = [];

        let currentOffset =
            0;

        for (

            const inline

            of paragraph.children

        ) {

            if (

                inline.type !==
                "text"

            ) {

                result.push(
                    inline
                );

                continue;

            }

            const text =
                inline.text;

            const textStart =
                currentOffset;

            const textEnd =
                currentOffset
                +
                text.length;

            const overlapStart =
                Math.max(
                    startOffset,
                    textStart
                );

            const overlapEnd =
                Math.min(
                    endOffset,
                    textEnd
                );

            if (

                overlapStart
                <
                overlapEnd

            ) {

                result.push({

                    ...inline,

                    text:

                        text.slice(

                            overlapStart
                            -
                            textStart,

                            overlapEnd
                            -
                            textStart

                        )

                });

            }

            currentOffset =
                textEnd;

        }

        return {

            inlines:
                result

        };

    }

}