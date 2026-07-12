// import type { NumberListNode }
// from "../../../../domain/editor/content/number-list-node";

import type { NumberListNode } from "~/domain/editor/contents/number-list-node";
import { ParagraphRenderer } from "./ParagraphRenderer";

// import { ParagraphRenderer }
// from "./ParagraphRenderer";

interface Props {

    node: NumberListNode;

}

export function NumberListRenderer({

    node

}: Props)
{

    return (

        <ol>

            {

                node.items.map(

                    (
                        item,
                        index
                    ) => (

                        <li
                            key={index}
                        >

                            <ParagraphRenderer
                                node={item}
                            />

                        </li>

                    )

                )

            }

        </ol>

    );

}