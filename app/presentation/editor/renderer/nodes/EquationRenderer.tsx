// import type { EquationNode } from "../../../../domain/editor/content/equation-node";

import type { EquationNode } from "~/domain/editor/contents/equation-node";

interface Props {

    node: EquationNode;

}

export function EquationRenderer({

    node

}: Props)
{

    return (

        <div>

            {node.latex}

        </div>

    );

}