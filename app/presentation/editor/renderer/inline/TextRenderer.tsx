import type { TextNode }
from "~/domain/editor/inlines/text-node";

interface Props{

    node:TextNode;

}

export function TextRenderer({

    node

}:Props){

    return(
         <span

            contentEditable

            suppressContentEditableWarning

        >

            {node.text || "\u00A0"}

        </span>

        // <span

        //     contentEditable

        //     suppressContentEditableWarning

        // >

        //     {node.text}

        // </span>

    );

}