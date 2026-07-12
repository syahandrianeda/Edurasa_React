import type { ParagraphNode }
from "~/domain/editor/contents/paragraph-node";
import { InlineRenderer } from "../../inline/InlineRenderer";

// import { InlineRenderer }
// from "../inline/InlineRenderer";

export interface ParagraphRendererProps{

    node:ParagraphNode;

}

export function ParagraphRenderer({

    node

}:ParagraphRendererProps){

    return(

        <p>

            {

                node.children.map(

                    (child,index)=>(

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