// import type { EntityNode } from "../../../../domain/editor/inlines/entities-node";
// import { InlineRenderer } from "./InlineRenderer";

import type { EntityNode } from "~/domain/editor/inlines/entities-node";
import { InlineRenderer } from "./InlineRenderer";

interface Props {

    node: EntityNode;

}

export function EntityRenderer({

    node

}: Props)
{

    return (

        <span

            data-entity-type={
                node.entityType
            }

        >

            {

                node.children.map(

                    (
                        child,
                        index
                    ) => (

                        <InlineRenderer

                            key={index}

                            node={child}

                        />

                    )

                )

            }

        </span>

    );

}