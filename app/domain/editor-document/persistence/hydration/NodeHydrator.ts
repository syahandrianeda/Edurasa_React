import type { ContentNode } from "~/domain/editor/contents/base-node";

export interface NodeHydrator {

    hydrate(
        payload: unknown
    ): ContentNode;

}