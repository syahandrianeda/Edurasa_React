// import type { ContentFragment }
// from "../resolver/ContentFragment";
import type { SelectionFragment }
from "../resolver/SelectionFragment";

import type { ParagraphNode }
from "~/domain/editor/contents/paragraph-node";

import type { InlineNode }
from "~/domain/editor/inlines/inline-node";

import type { FragmentTextResult }
from "./FragmentTextResult";

export class FragmentTextBuilder {

    build(

        fragment:SelectionFragment
            // ContentFragment

    ): FragmentTextResult {

        const parts:
            string[]
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

            parts.push(

                this.extractParagraph(
                    node
                )

            );

        }

        return {

            text:

                parts.join(
                    "\n"
                )

        };

    }

    private extractParagraph(

        paragraph:
            ParagraphNode

    ): string {

        const result:
            string[]
            = [];

        for (

            const inline

            of paragraph.children

        ) {

            result.push(

                this.extractInline(
                    inline
                )

            );

        }

        return result.join("");

    }

    private extractInline(

        inline:
            InlineNode

    ): string {

        if (

            inline.type ===
            "text"

        ) {

            return inline.text;

        }

        return inline.children
            .map(

                child =>

                    this.extractInline(
                        child
                    )

            )
            .join("");

    }

}