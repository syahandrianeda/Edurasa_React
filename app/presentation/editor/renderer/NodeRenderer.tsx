// import type { ContentNode }
// from "../../../domain/editor/content/base-node";

import type { ContentNode } from "~/domain/editor/contents/base-node";
import { ParagraphRenderer } from "./nodes/ParagraphRenderer";

// import { ParagraphRenderer }
// from "./nodes/ParagraphRenderer";

// import { ImageRenderer } from "./nodes/ImageRenderer";

// import { EquationRenderer } from "./nodes/EquationRenderer";

// import { ListRenderer } from "./nodes/ListRenderer";

import { NumberListRenderer } from "./nodes/NumberListRenderer";

// import { TableRenderer } from "./nodes/TableRenderer";
import { ImageRenderer } from "./nodes/ImageRenderer";
import { ListRenderer } from "./nodes/ListRenderer";
import { EquationRenderer } from "./nodes/EquationRenderer";
import { TableRenderer } from "./nodes/TableRenderer";

interface Props {

    node: ContentNode;

}

export function NodeRenderer({

    node

}: Props)
{

    switch (node.type)
    {

        case "paragraph":

            return (
                <ParagraphRenderer
                    node={node}
                />
            );

        case "image":

            return (
                <ImageRenderer
                    node={node}
                />
            );

        case "equation":

            return (
                <EquationRenderer
                    node={node}
                />
            );

        case "list":

            return (
                <ListRenderer
                    node={node}
                />
            );

        case "number-list":

            return (
                <NumberListRenderer
                    node={node}
                />
            );

        case "table":

            return (
                <TableRenderer
                    node={node}
                />
            );

        default:

            return null;

    }

}