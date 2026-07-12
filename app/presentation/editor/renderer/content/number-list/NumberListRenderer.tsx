import type { NumberListNode }
from "~/domain/editor/contents/number-list-node";

import { ParagraphRenderer }
from "../paragraph/ParagraphRenderer";

interface NumberListRendererProps{

    node:NumberListNode;

}

export function NumberListRenderer({

    node

}:NumberListRendererProps){

    return(

        <ol>

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

        </ol>

    );

}