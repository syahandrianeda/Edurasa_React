import type { TableNode }
from "~/domain/editor/contents/table-node";

interface TableRendererProps{

    node:TableNode;

}

export function TableRenderer({

    node

}:TableRendererProps){

    return(

        <div>

            Table

        </div>

    );

}