// import type { ParagraphNode }
// from "../../../../domain/editor/content/paragraph-node";

import type { ParagraphNode } from "~/domain/editor/contents/paragraph-node";
import { InlineRenderer } from "../inline/InlineRenderer";

// import { InlineRenderer }
// from "../inline/InlineRenderer";

interface Props {

    node: ParagraphNode;

}

export function ParagraphRenderer({

    node

}: Props)
{

    return (

        <p>

            {

                node.children.map(

                    (
                        child,
                        index
                    ) => (

                        <InlineRenderer

                            key={index}

                            node={child}

                        />

                    )

                )

            }

        </p>

    );

}