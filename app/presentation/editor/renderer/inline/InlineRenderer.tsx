// import type { InlineNode }
// from "../../../../domain/editor/inlines/inline-node";

import type { InlineNode } from "~/domain/editor/inlines/inline-node";
import { EntityRenderer } from "./EntityRenderer";
import { TextRenderer } from "./TextRenderer";

// import { TextRenderer }
// from "./TextRenderer";

// import { EntityRenderer }
// from "./EntityRenderer";

interface Props {

    node: InlineNode;

}

export function InlineRenderer({

    node

}: Props)
{

    switch (node.type)
    {

        case "text":

            return (
                <TextRenderer
                    node={node}
                />
            );

        case "entity":

            return (
                <EntityRenderer
                    node={node}
                />
            );

        default:

            return null;

    }

}