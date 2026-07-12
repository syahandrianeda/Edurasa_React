//domain/editor-document/persistence/hydration/ListHydrator.ts
//domain/editor-document/persistence/hydration/NumberListHydrator.ts
import type { ListNode } from "~/domain/editor/contents/list-node";
import type { ContentNode } from "~/domain/editor/contents/base-node";
import type { NodeHydrator } from "./NodeHydrator";

export class ListHydrator implements NodeHydrator {

    hydrate(
        payload: unknown
    ): ContentNode {

        return payload as ListNode;

    }

}