// import type { ListNode } from "../../../../domain/editor/content/list-node";
// import { ParagraphRenderer } from "./ParagraphRenderer";

import type { ListNode } from "~/domain/editor/contents/list-node";
import { ParagraphRenderer } from "./ParagraphRenderer";

interface Props {

    node: ListNode;

}

export function ListRenderer({

    node

}: Props)
{

    return (

        <ul>

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

        </ul>

    );

}