import type { EquationNode }
from "~/domain/editor/contents/equation-node";

interface EquationRendererProps{

    node:EquationNode;

}

export function EquationRenderer({

    node

}:EquationRendererProps){

    return(

        <div>

            Equation

        </div>

    );

}