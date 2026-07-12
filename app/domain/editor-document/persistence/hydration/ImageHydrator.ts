import type { ImageNode } from "~/domain/editor/contents/image-node";

import type { ContentNode } from "~/domain/editor/contents/base-node";

import type { NodeHydrator } from "./NodeHydrator";

export class ImageHydrator implements NodeHydrator {

    hydrate(
        payload: unknown
    ): ContentNode {

        return payload as ImageNode;

    }

}