//domain/editor-document/persistence/hydration/NumberListHydrator.ts
import type { NumberListNode } from "~/domain/editor/contents/number-list-node";
import type { ContentNode } from "~/domain/editor/contents/base-node";
import type { NodeHydrator } from "./NodeHydrator";

export class NumberListHydrator implements NodeHydrator {

    hydrate(
        payload: unknown
    ): ContentNode {

        return payload as NumberListNode;

    }

}