import type { ListNode }
from "~/domain/editor/contents/list-node";

import { ParagraphRenderer }
from "../paragraph/ParagraphRenderer";

interface ListRendererProps{

    node:ListNode;

}

export function ListRenderer({

    node

}:ListRendererProps){

    return(

        <ul>

            {

                node.items.map(

                    (item)=>(

                        <li key={item.id}>

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