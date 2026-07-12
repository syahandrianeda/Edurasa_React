// import type { ImageNode } from "~/domain/editor/content/image-node";

import type { ImageNode } from "~/domain/editor/contents/image-node";



interface Props {

    node: ImageNode;

}

export function ImageRenderer({

    node

}: Props)
{

    return (

        <img

            src={
                node.snapshot?.source
            }

            width={
                node.width
            }

            height={
                node.height
            }

            alt=""

        />

    );

}