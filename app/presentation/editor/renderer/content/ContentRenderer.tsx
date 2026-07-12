import type { ContentNode }
from "~/domain/editor/contents/base-node";

import { ParagraphRenderer } from "./paragraph/ParagraphRenderer";
//error
import { ImageRenderer } from "./image/ImageRenderer";
// import { TableRenderer } from "./table/TableRenderer.tsx";
import { EquationRenderer } from "./equation/EquationRenderer";
import { TableRenderer } from "./table/TableRenderer";
import { ListRenderer } from "./list/ListRenderer";
import { NumberListRenderer } from "./number-list/NumberListRenderer";
// import { NumberListRenderer } from "./number-list/NumberListRenderer";
export interface ContentRendererProps{

    node:ContentNode;

}

export function ContentRenderer({

    node

}:ContentRendererProps){

    switch(node.type){

        case "paragraph":

            return(

                <ParagraphRenderer

                    node={node}

                />

            );

        case "image":

            return(

                <ImageRenderer

                    node={node}

                />

            );

        case "table":

            return(

                <TableRenderer

                    node={node}

                />

            );

        case "equation":

            return(

                <EquationRenderer

                    node={node}

                />

            );

        case "list":

            return(

                <ListRenderer

                    node={node}

                />

            );

        case "number-list":

            return(

                <NumberListRenderer

                    node={node}

                />

            );

        default:

            return null;

    }

}