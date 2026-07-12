// import type { SectionNode }
// from "../../../domain/editor/section/section-node";

import type { SectionNode } from "~/domain/editor/sections/section-node";
import { NodeRenderer } from "./NodeRenderer";

// import { NodeRenderer }
// from "./NodeRenderer";

interface Props {

    section:
        SectionNode;

}

export function SectionRenderer({

    section

}: Props)
{

    return (

        <div>

            {

                section.children
                    .map(

                        (
                            node,
                            index
                        ) => (

                            <NodeRenderer

                                key={
                                    index
                                }

                                node={
                                    node
                                }

                            />

                        )

                    )

            }

        </div>

    );

}