import type { ParagraphNode } from "~/domain/editor/contents/paragraph-node";

import type { ContentNode } from "~/domain/editor/contents/base-node";

import type { NodeHydrator } from "./NodeHydrator";

export class ParagraphHydrator implements NodeHydrator {

    hydrate(
        payload: unknown
    ): ContentNode {

        return payload as ParagraphNode;

    }

}