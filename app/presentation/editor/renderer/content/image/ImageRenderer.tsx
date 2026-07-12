import type { ImageNode }
from "~/domain/editor/contents/image-node";

interface ImageRendererProps{

    node:ImageNode;

}

export function ImageRenderer({

    node

}:ImageRendererProps){

    return(

        <div>

            Image

        </div>

    );

}