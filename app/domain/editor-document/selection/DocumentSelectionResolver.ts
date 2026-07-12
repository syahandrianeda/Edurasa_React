import type { EditorDocument }
from "../EditorDocument";

import type { SelectionState }
from "./SelectionState";

import type { ContentNode }
from "~/domain/editor/contents/base-node";

import type { ParagraphNode }
from "~/domain/editor/contents/paragraph-node";

import type { InlineNode }
from "~/domain/editor/inlines/inline-node";

import type { TextNode }
from "~/domain/editor/inlines/text-node";

export class DocumentSelectionResolver {

    resolveText(

        document:
            EditorDocument,

        selection:
            SelectionState

    ): string {

        const node =
            this.findNode(

                document.children,

                selection
                    .range
                    .anchor
                    .nodeId

            );

        if (
            !node
        ) {

            return "";
        }

        if (
            node.type !==
            "paragraph"
        ) {

            return "";
        }

        const paragraph =
            node as ParagraphNode;

        const text =
            this.extractText(
                paragraph.children
            );

        const start =
            selection
                .range
                .anchor
                .offset;

        const end =
            selection
                .range
                .focus
                .offset;

        return text.substring(
            start,
            end
        );

    }

    private findNode(

        nodes:
            ContentNode[],

        nodeId:
            string

    ): ContentNode | undefined {

        return nodes.find(

            node =>

                node.id ===
                nodeId

        );

    }

    private extractText(

        inlines:
            InlineNode[]

    ): string {

        return inlines

            .map(

                inline => {

                    if (
                        inline.type ===
                        "text"
                    ) {

                        return (
                            inline as TextNode
                        ).text;

                    }

                    return "";

                }

            )

            .join("");

    }

}